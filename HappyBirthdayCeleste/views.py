"""
views.py
Views for Celeste's 15th birthday website
"""
from flask import Flask, request, redirect, url_for, render_template, flash
from HappyBirthdayCeleste import app

@app.route('/', methods=['GET'])
def index():
    """Homepage"""
    return render_template('index.html')

