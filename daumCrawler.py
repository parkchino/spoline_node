# Step 1. 필요한 모듈과 라이브러리를 로딩하고 검색어를 입력 받습니다
from bs4 import BeautifulSoup     
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import datetime
import sys
import numpy  
import pandas as pd  
import xlwt 
import random
import urllib.request
import urllib
import re
import math
import os
import MySQLdb

s_time = time.time()

connection = MySQLdb.connect(
    user='root', 
    passwd='lfochino', 
    host='127.0.0.1', 
    db='scrapingdata', 
    charset='utf8'
)

#db 연결 확인
print(type(connection))
# <class 'MySQLdb.connections.Connection'>

#커서 연결
cursor = connection.cursor()
#커서 연결 확인
print(type(cursor))



cursor.execute("DROP TABLE IF EXISTS match_lists")
# sql = """CREATE TABLE match_lists (index int,event_day varchar(10),league_name varchar(45), event_time TIME, hometeam varchar(45), hometeam_score varchar(8),match_result varchar(16),awayteam_score varchar(8),awayteam varchar(45))"""
cursor.execute("CREATE TABLE match_lists (id INT AUTO_INCREMENT PRIMARY KEY,event_day varchar(10),league_name varchar(45), event_time varchar(20), hometeam varchar(45), hometeam_score varchar(8),match_result varchar(16),awayteam_score varchar(8),awayteam varchar(45))")



for month in range(1,13):
    #Step 2. 크롬 드라이버를 사용해서 웹 브라우저를 실행합니다.
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
#     options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    options.page_load_strategy = 'normal'
    # 혹은 options.add_argument("--disable-gpu")

    driver = webdriver.Chrome('chromedriver', chrome_options=options)
#     driver = webdriver.Chrome('chromedriver')
#     time.sleep(2)
    if (month <10):
        driver.get('https://sports.daum.net/schedule/worldsoccer?date=20210%d' %month)
    else:
         driver.get('https://sports.daum.net/schedule/worldsoccer?date=2021%d' %month)
#     driver.maximize_window() #윈도우 최대창크기
#     time.sleep(2)
    #element.send_keys("\n") #엔터키 작동
    #목표 1. 리그별 리스트 만들기
    html = driver.page_source ## 페이지의 elements모두 가져오기
    soup = BeautifulSoup(html, 'html.parser')
    scheduleList = soup.find(id="scheduleList")


    for day in range(1,32):

        if (day <10):
            scheduleList2 = scheduleList.find_all("div",{"data-term":"0%s"%day})
            print("2월 0%s일\n" %day)


        else:
            scheduleList2 = scheduleList.find_all("div",{"data-term":"%s"%day})
            print("2월 %s일\n" %day)



        for x in scheduleList2:
            tbody = x.find("tbody")
            tr = tbody.find_all("tr")
            tit_league = x.find("strong","tit_league").get_text() #리그 종류
    #         league_img = x.find("img") 
    #         league_img =league_img.get('src') # 리그 로고
            event_day = x.find('span','num_date').get_text()
            event_day = event_day.replace(".","/")
            print(tit_league)  #리그 종류 
    #         print(league_img)
            for y in tr:
                hometeam = y.find('div','info_team team_home').find('span','txt_team').get_text()
                hometeam_score = y.find('div','info_team team_home').select_one("span:nth-of-type(3)").text
                hometeam_img = y.find('div','info_team team_home').find("img").get("src")
                awayteam = y.find('div','info_team team_away').find('span','txt_team').get_text()
                awayteam_score = y.find('div','info_team team_away').find("em").get_text()
                awayteam_img = y.find('div','info_team team_away').find("img").get("src")
                event_time = y.find('td','td_time').get_text()
                match_result = y.find('span','state_game').get_text()
    #             if(hometeam_score === "-"):
    #                 hometeam_score = -1
    #             else if 

                #cursor.execute(f"INSERT INTO match_list VALUES(\"{num}\",\"{event_day}\",\"{tit_league}\",\"{event_time}\",\"{hometeam}\",\"{hometeam_score}\",\"{match_result}\",\"{awayteam_score}\",\"{awayteam}\")"%day) #,\"{league_img}\",\"{hometeam_img}\",\"{awayteam_img}\"
                sql = "insert into match_lists (event_day,league_name,event_time,hometeam,hometeam_score,match_result,awayteam_score,awayteam) VALUES (%s, %s,%s,%s,%s,%s,%s,%s)"
                val = (event_day,tit_league,event_time,hometeam,hometeam_score,match_result,awayteam_score,awayteam)
                cursor.execute(sql,val)

                print(event_day,tit_league,event_time, hometeam, hometeam_score ,match_result, awayteam_score,awayteam) #league_img,hometeam_img,awayteam_img

            print("\n")
    connection.commit()        
    driver.close()

e_time = time.time()
t_time = e_time - s_time

print("소요시간은 %s 초 입니다" %round(t_time,1))

    #쿼리문 작성 부분
    #테이블 생성