#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import print_function
import time
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    next = u'次のページへ行くよー'
    return render_template('/index.html', message=next)

@app.route('/sample/')
def sample():
    return render_template('/sample/sample.html')

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
