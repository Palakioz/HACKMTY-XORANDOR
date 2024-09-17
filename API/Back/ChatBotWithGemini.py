import google.generativeai as genai
import os
import time

API_KEY = ""

"""
    @brief Function to get response from chat
"""
def fetchResponse(chat, prompt):
    response = chat.send_message(prompt)
    return response.text

'''
    @brief Function to initilaize a chat window
'''
def manageChat(chat):
    s = ''
    while 1:
        s = input()
        if s == "quit":
            break
        print(fetchResponse(chat, s))

'''
    @brief function to initiate chat
'''
def initiateChat():
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
    return chat

