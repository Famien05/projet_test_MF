# projet_test_MF
import subprocess

def get_new_mdp(BU, BL, ecosystem):
    cert_pfx = "votre_chemin_vers_cert_pfx"
    cert_key = "votre_chemin_vers_cert_key"
    postgresinst = "votre_valeur_postgresinst"
    postgresUser = "votre_valeur_postgresUser"
    hvaulturl = "votre_valeur_hvaulturl"
    
    json_token = f"curl --cert {cert_pfx} --key {cert_key}"
    url = f"{hvaulturl}/v1/{BU}/{BL}/{ecosystem}/auth/cert/login"
    cmd = f"{json_token} {url}"
    
    print(cmd)
    new_pw = subprocess.check_output(cmd, shell=True).decode().strip()
    return new_pw
