from cryptography.fernet import Fernet

# Generate a key and instantiate the Fernet cipher
key = Fernet.generate_key()
cipher_suite = Fernet(key)

# Encrypt a file
with open('example.txt', 'rb') as file:
    file_data = file.read()

encrypted_data = cipher_suite.encrypt(file_data)

with open('example.txt.enc', 'wb') as file:
    file.write(encrypted_data)

# Decrypt a file
with open('example.txt.enc', 'rb') as file:
    encrypted_data = file.read()

decrypted_data = cipher_suite.decrypt(encrypted_data)

with open('example_decrypted.txt', 'wb') as file:
    file.write(decrypted_data)