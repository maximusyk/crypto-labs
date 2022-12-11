import numpy as np
import random
import copy
import re

def encode_decode(arr, key_hor, key_ver, encode):
    list_hor = list(key_hor)
    list_ver = list(key_ver)
    if encode:
        random.shuffle(list_hor)
        random.shuffle(list_ver)
    arr_local = np.transpose(copy.deepcopy(arr))
    temp = copy.deepcopy(arr_local)
    for i in range(0, len(list_hor)):
        arr_local[i+1] = temp[np.where(arr[0]==list_hor[i])[0]][0]
    array_copy = copy.deepcopy(arr_local)
    arr_local = np.transpose(arr_local)
    temp = copy.deepcopy(arr_local)
    for i in range(0, len(list_ver)):
        arr_local[i+1] = temp[np.where(array_copy[0]==list_ver[i])[0]][0]
    arr_local_for_return = copy.deepcopy(arr_local)
    if encode:
        arr_local = np.transpose(arr_local)
    arr_local = np.delete(arr_local, 0,0)
    arr_local = np.delete(arr_local, 0,1)
    text_crypto = ''
    for row in arr_local:
        text_row = ''.join(row)
        if text_row != ' ':
            text_crypto = text_crypto + text_row
    text_encrypted = text_crypto.strip()
    return arr_local_for_return, text_encrypted


horizontal_key = input("Enter the horizontal key: ")
vertical_key = input("Enter the vertical key: ")

horizontal_key_len = len(horizontal_key)
vertical_key_len = len(vertical_key)

array_size = horizontal_key_len * vertical_key_len

text_to_encrypt = input(f"Enter the text to encrypt(*max {array_size} sym): ")[:array_size]

array = np.array(list(text_to_encrypt))
empty_array = np.empty(array_size-len(text_to_encrypt), str)
array = np.concatenate((array, empty_array), axis=0).reshape((vertical_key_len, horizontal_key_len))

array = np.insert(array, 0, list(horizontal_key), axis=0)
array = np.insert(array, 0, list(' '+vertical_key), axis=1)

print('\nEncoding...')
encrypted_array, encrypted_text = encode_decode(array, horizontal_key, vertical_key, True)
print('Encrypted matrix:\n', encrypted_array)
print('Encrypted text:', encrypted_text)

print('\nDecoding...')
decrypted_array, decrypted_text = encode_decode(array, horizontal_key, vertical_key, False)
print('Decrypted matrix:\n', decrypted_array)
print('Decrypted text:', decrypted_text)