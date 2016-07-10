from __future__ import with_statement
from fabric.api import *
from fabric.contrib.console import confirm

env.hosts = ['107.175.2.186']

def test():
    with settings(warn_only=True):
        result = local('./manage.py test my_app', capture=True)
    if result.failed and not confirm("Tests failed. Continue anyway?"):
        abort("Aborting at user request.")

def commit():
    local("git add -A && git commit -m 'Pushed using Fabric'")

def push():
    local("git push origin master")

def prepare_deploy():
    # test()
    commit()
    push()

def deploy():
    code_dir = '/home/barbz/youwillfocus'
    with settings(warn_only=True):
        if run("test -d %s" % code_dir).failed:
            run("git clone https://github.com/danielbarbarito/youwillfocus.git %s" % code_dir)
    with cd(code_dir):
        run("git pull origin master")
        run("sudo supervisorctl reload")
