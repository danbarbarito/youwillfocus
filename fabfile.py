from __future__ import with_statement
from fabric.api import *
from fabric.contrib.console import confirm

env.hosts = ['107.175.2.186']
env.path = ['/home/barbz/.gvm/gos/go1.6.2/bin/']

def test():
    with settings(warn_only=True):
        result = local('./manage.py test my_app', capture=True)
    if result.failed and not confirm("Tests failed. Continue anyway?"):
        abort("Aborting at user request.")

def commit():
    with settings(warn_only=True):
        local("git add -A && git commit -m 'Pushed using Fabric'")

def push():
    with settings(warn_only=True):
        local("git push origin master")

def prepare_deploy():
    commit()
    push()

def deploy():
    prepare_deploy()
    code_dir = '/home/barbz/.go/src/youwillfocus'
    with settings(warn_only=True):
        if run("test -d %s" % code_dir).failed:
            run("git clone git@github.com:danielbarbarito/youwillfocus.git %s" % code_dir)
    with cd(code_dir):
        with settings(warn_only=True):
            kill_running = run("killall youwillfocus")
        if kill_running.failed:
            print("Server was not running")
        run("git pull origin master")
        run("go run youwillfocus.go")
