import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
 

@Injectable({
  providedIn: 'root'
})
export class WebAuthnService {

/*
    webAuthnSignup(user: User): Promise<CredentialType> {
        console.log('[webAuthnSignup]');
        const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
          // Challenge shoulda come from the server
          challenge: this.serverMockService.getChallenge(),
          rp: {
            name: 'WebAuthn Test',
            // id: 'localhost:4200',
          },
          user: {
            // Some user id coming from the server
            id: Uint8Array.from(user.id, c => c.charCodeAt(0)),
            username: user.username,
            //displayName: user.email,
          },
          pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            // requireResidentKey: true,
          },
          timeout: 60000,
          attestation: 'direct'
        };
    
        return navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions,
        });
    
      }
*/
}