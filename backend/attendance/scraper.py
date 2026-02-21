import requests
from bs4 import BeautifulSoup
import re

LOGIN_URL = "http://mitsims.in/studentLogin/studentLogin.action?personType=student"
DASHBOARD_URL = "http://mitsims.in/gemsonline-student/dashboard.action?actionType=view"


def find_number(text):
    m = re.search(r'(\d+(?:\.\d+)?)', text)
    return float(m.group(1)) if m else None


def fetch_attendance(user_id: str, password: str) -> dict:
    """
    Logs into the college portal and scrapes attendance data.
    Returns a dict with 'subjects', 'summary', or raises an exception.
    """
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
    })

    # === LOGIN ===
    try:
        payload = {"userId": user_id, "password": password}
        login_resp = session.post(LOGIN_URL, data=payload, timeout=15)
        login_resp.raise_for_status()
    except requests.exceptions.Timeout:
        raise Exception("Login request timed out. Try again.")
    except requests.exceptions.ConnectionError:
        raise Exception("Cannot connect to college portal. It may be down.")

    if "success" not in login_resp.text.lower():
        raise Exception("Invalid credentials. Please check your User ID and Password.")

    # === FETCH DASHBOARD ===
    try:
        resp = session.get(DASHBOARD_URL, timeout=15)
        resp.raise_for_status()
    except requests.exceptions.Timeout:
        raise Exception("Dashboard request timed out.")

    # === PARSE ===
    soup = BeautifulSoup(resp.text, "html.parser")
    spans = [s.get_text(strip=True) for s in soup.find_all("span")]
    spans = [s for s in spans if s]

    rows, seen = [], set()
    N = len(spans)
    i = 0
    while i <= N - 5:
        t0, t1, t2, t3, t4 = spans[i:i+5]
        if re.fullmatch(r'\d+', t0):
            num_att = find_number(t2)
            num_tot = find_number(t3)
            num_perc = find_number(t4)
            if num_att is not None and num_tot is not None:
                subject = t1.strip()
                key = (subject, num_att, num_tot)
                if key not in seen:
                    rows.append({
                        "subject": subject,
                        "attended": int(num_att),
                        "total": int(num_tot),
                        "percentage": round(num_perc if num_perc is not None else (num_att / num_tot * 100), 2)
                    })
                    seen.add(key)
                i += 5
                continue
        i += 1

    if not rows:
        raise Exception("No attendance data found. Portal structure may have changed.")

    total_attended = sum(r["attended"] for r in rows)
    total_classes = sum(r["total"] for r in rows)
    overall = round((total_attended / total_classes) * 100, 2) if total_classes > 0 else 0

    return {
        "subjects": rows,
        "summary": {
            "total_subjects": len(rows),
            "total_attended": total_attended,
            "total_classes": total_classes,
            "overall_percentage": overall,
        }
    }
