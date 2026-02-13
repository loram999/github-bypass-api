from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import asyncio
import aiohttp
from bs4 import BeautifulSoup
# သင့် web_scrapper2.py က libraries တွေ import လုပ်ပါ (BeautifulSoup, requests, etc.)
# အကြမ်းဖျင်း scraper function ကို ဒီနေရာမှာ ထည့်ပါ

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScrapeRequest(BaseModel):
    url: str

@app.post("/api/scrape")
async def scrape_website(request: ScrapeRequest):
    # ဒီနေရာမှာ web_scrapper2.py က scrape logic ကို ခေါ်ပါ
    # ဥပမာ:
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(request.url) as resp:
                html = await resp.text()
                soup = BeautifulSoup(html, 'html.parser')
                title = soup.title.string if soup.title else 'No title'
        
        result = {
            "success": True,
            "title": title,
            "assets": [],  # သင့် asset detection logic
            "backend": [], # backend detection
            "vulnerabilities": [] # vulnerability scan
        }
        return result
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/")
def root():
    return {"message": "Web Scraper API Ready"}