import base64
import hmac
import struct
import sys
import time


def setup():
    # get a random value for secret generation
    # generate secret
    # send secret to user (once)
    # put secret in a storage
    pass


def is_valid(client_public_key, totp):
    # get client's pubkey from request
    # get his secret from storage
    # generate a totp using his secret
    # compare newly generated totp with the totp sent by the user
    # if valid, sign safe contract
    pass


def generate_secret():
    # randomly generates a secret key for user's 2FA
    pass


def hotp(key, counter, digits=6, digest='sha1'):
    key = base64.b32decode(key.upper() + '=' * ((8 - len(key)) % 8))
    counter = struct.pack('>Q', counter)
    mac = hmac.new(key, counter, digest).digest()
    offset = mac[-1] & 0x0f
    binary = struct.unpack('>L', mac[offset:offset+4])[0] & 0x7fffffff
    return str(binary)[-digits:].zfill(digits)


def totp(key, time_step=30, digits=6, digest='sha1'):
    return hotp(key, int(time.time() / time_step), digits, digest)