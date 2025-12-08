import requests
from bs4 import BeautifulSoup
import subprocess

def readrules(url: str) -> str:
    """Fetch webpage text content."""
    try:
        html = requests.get(url).text
        soup = BeautifulSoup(html, "html.parser")
        return soup.get_text()
    except Exception as e:
        return f"Error fetching URL: {e}"

def summarize_zing():
    """Fetch ZingHR webpage → summarize using OLLAMA."""
    url = "https://zingnext.zinghr.com/portal/tna"
    content = readrules(url)
    prompt = f"Summarize this:\n\n{content}"
    result = subprocess.run(
        ["ollama", "run", "llama3"],
        input=prompt,
        text=True,
        capture_output=True
    )

    return result.stdout
