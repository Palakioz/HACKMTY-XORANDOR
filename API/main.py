from fastapi import FastAPI
from Back import twofactor as Send
import google.generativeai as genai
import os
import time
from Back import ChatBotWithGemini as GM
import pandas as pd

API_KEY = " "

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat(
        history=[
            {"role": "user", "parts": "Eres un agente de servicio a cliente para la empresa Banorte"},
            {"role": "user", "parts": "Tu responsabilidad es atender al cliente con dudas sobre conceptos de Educacion Financiera que pudieran o no conocer"},
            {"role": "user", "parts": "Seras implementado dentro de una aplicacion mayor encargada del onboarding para jovenes de Banamex"},
            {"role": "user", "parts": "El cliente abrira un chat contigo picandole a un boton de mas informacion"},
            {"role": "user", "parts": "Te enviaremos un prompt con el concepto con el que tiene duda"},
            {"role": "user", "parts": "Deberas responder con una explicacion breve de no mas de tres oraciones del concepto"},
            {"role": "user", "parts": "Tambien deberas motivarlos a hacer preguntas adicionales"},
            {"role": "user", "parts": "Estas operando mediante leyes Mexicanas por lo cual rigete lo que dice la ley Mexicana unicamente"},
            {"role": "user", "parts": "Tu labor es asegurar que el cliente obtenga un entendimiento suficiente del concepto para poder tomar una decision sobre seguir con un proceso de onboarding"},
            {"role": "user", "parts": "No debes especificar tipos de interes especificos a la empresa, si no el concepto de manera global"},
        ]
    )

app = FastAPI()

currPrompt = ""
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/SendCode/{phoneNumber}")
async def getCode(phoneNumber):
    Send.sendCode(phoneNumber)
 
@app.get("/TFA/{code}")
async def validate(code):
    return {"verification": Send.verifyOTP(code)}

@app.get("/Gemini/{prompt}")
async def processResponse(prompt):
    response = chat.send_message(prompt)
    return {"Sent": response.text}

@app.get("/test")
async def sendTest():
    return{"test" : "This is a test"}

@app.get("/TextGeneration/{infodeUsuario}")
async def generateBodyText(infodeUsuario):
    file_path = 'table.csv'
    prompt = 'Genérame un párrafo cortito vendiéndole la plataforma Banorte al usuario dirigiéndose a algo que leerá.'
    df = pd.read_csv(file_path)
    csv_content = df.to_string(index=False)

    newChat = model.start_chat(
        history = [{"role": "user", "parts": "Te voy a pasar un file de csv para que analizes. Por informacion, F es igual a Mujer, M igual a Hombre"},
                   {"role": "user", "parts": csv_content},
                   {"role": "user", "parts": "Ese csv contiene informacion por demografia. A continuacion te presento informacion de un posible cliente"},
                   {"role": "user", "parts" : "Deberas escribirle un parrafo dirigo a la persona que te otorguemos que le explicara porque le conviene seguir con su proceso de onboarding con Banorte usando sus preferencias y sus demograficas"},
                   {"role": "user", "parts": "No menciones niguna de las companias que fueron proporcionadas por nombre, unicamente las industrias"},
                   {"role": "user", "parts": "Manten la informacion sencilla y corta, haz tres puntos de enfasis y ya"},
                   {"role": "user", "parts": "Inventate ofertas de banorte relacionados con las industrias que mas le podria interesar"},
                   {"role": "user", "parts": "Como estamos hablando de un posible cliente tratalos como posible cliente, no como cliente existente"},
                   {"role": "user", "parts": "Hazlo especificio a la persona que te mandemos, te mandaremos su Nombre, Edad, Genero, ciudad de origen, y Con Quien tiene creditos"},
                   {"role" : "user", "parts": "Con los que tiene creditos haz una estimacion de su nivel socioeconomico. Usa solo con quien tiene, no cantidad"},
                   {"role": "user", "parts": "Usando su nivel socioeconomico, da recomendaciones locales a su zona geografica"},
                   {"role": "user", "parts": "Asegurate que las recomendaciones sean especificas a su nivel socioeconomico"},
                   {"role": "user", "parts": "Personaliza el mensaje al usuario sin mencionar los detalles de donde esta su credito. Usa solo industrias o campos."},
                   {"role": "user", "parts": "Menciona minimo 2 empresas especificas que podian ser de interes"},
                   {"role": "user", "parts": "Se conciso. Tienes limite de 4 oraciones"},
                   {"role": "user", "parts": "El mensaje tiene que concluir con la persona continuando su proceso de onboarding"},
                   {"role": "user", "parts": "No hagas mencion explicita de sus niveles socioeconomicos o algo que aluda. Unicamente usa empresas y productos que podrian usar"},
                   {"role": "user", "parts": "No digas explicitamente que sabes informacion del usuario"},
                   {"role": "user", "parts": "Tienes prohibido darle formato adicional al texto"},
                   {"role": "user", "parts": "El siguiente mensaje te dara la info de usuario"},
                   {"role": "user", "parts": infodeUsuario}
                   ]         
    )
    print(infodeUsuario)
    response = newChat.send_message(prompt)
    return {"response" : response.text}