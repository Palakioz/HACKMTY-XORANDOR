import time
import pyotp
import pywhatkit as kit

key = ""

def generateOTP():
    totp = pyotp.TOTP(key, interval = 120)
    print(totp.now())
    return totp.now()

def verifyOTP(code):
    totp = pyotp.TOTP(key, interval = 120)
    return totp.verify(code)

def sendCode(PhoneNumber: str):
    try:
        msg = generateOTP()
        print(PhoneNumber)
        kit.sendwhatmsg_instantly(PhoneNumber, "Authentication Code is: " + msg, tab_close=True)
        print("sent")
    except:
        print("Fail")
