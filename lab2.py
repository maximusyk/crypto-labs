import re

alphabet_dict={
	"A":'11',"B":'12',"C":"13","D":'14',"E":'15',
	"F":'21',"G":'22',"H":'23',"I":'24',"J":'25',
	"K":'31',"L":'32',"M":'33',"N":'34',"O":'35',
	"P":'41',"Q":'42',"R":'43',"S":'44',"T":'45',
	"U":'51',"V":'52',"W":'53',"X":'54',"Y":'55',
	"Z":'61'," ":'62'
}
		   

def encrypt(text_to_encrypt):
    hor_coordinates = ''
    ver_coordinates = ''
    for char in text_to_encrypt:
        hor_coordinates += alphabet_dict[char][0]
        ver_coordinates += alphabet_dict[char][1]
    list_encrypted_text = re.findall('..', hor_coordinates+ver_coordinates)
    return ' '.join(list_encrypted_text)

def decrypt(text_coordinates):
    hor_coordinates = text_coordinates[:len(text_coordinates)//2].replace(' ', '')
    ver_coordinates = text_coordinates[len(text_coordinates)//2:].replace(' ', '')
    dict_swap = {value: key for key, value in alphabet_dict.items()}
    text = ''
    for i in range(0, len(hor_coordinates)):
        text += dict_swap[hor_coordinates[i]+ver_coordinates[i]]
    return text


text_to_encrypt = input("Text to encrypt: ")
text_to_encrypt = text_to_encrypt.upper()
print("\nEncrypting...")
encrypted_text = encrypt(text_to_encrypt)
print("Encrypted text: ",encrypted_text)

print("\nDecrypting...")
decrypted_text = decrypt(encrypted_text)
print("Decrypted text: ",decrypted_text)
