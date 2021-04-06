# Step 1. 필요한 모듈과 라이브러리를 로딩하고 검색어를 입력 받습니다
from bs4 import BeautifulSoup     
from selenium import webdriver
import time
import datetime
import sys
import numpy  
import pandas as pd 
import random
import urllib.request
import urllib
import re
import math
import os
import MySQLdb

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

driver = webdriver.Chrome('chromedriver')
driver.get('https://www.betexplorer.com/next/soccer/')

time.sleep(2)
#로그인
driver.find_element_by_css_selector("#js-header > div.header__top > div > div > ul > li:nth-child(1) > a").click()
element_id= driver.find_element_by_id("login_nick")
element_id.send_keys("parkchino")
element_pw= driver.find_element_by_id("login_pass")
element_pw.send_keys("1234")
driver.find_element_by_id("js-window-action-login").click()

# 시간 설정
driver.find_element_by_css_selector("#js-timezone > ul > li:nth-child(10) > a").click() 

html = driver.page_source ## 페이지의 elements모두 가져오기
