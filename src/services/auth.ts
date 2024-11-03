import crypto from 'crypto';


export class authService {
    public static hashPassword(password: string): string {
        const salt = crypto.randomBytes(60).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
        return salt + hash;
    }

    public static verifyPassword(providedPassword: string, storedPassword: string): boolean {
        const salt = storedPassword.substring(0, 120);
        const originalHash = storedPassword.substring(120);
        const hash = crypto.pbkdf2Sync(providedPassword, salt, 100000, 64, 'sha512').toString('hex');
        return hash === originalHash;
    }

    public static generateValidationCodeFromEmail(email: string) {
        const secret = process.env.NEXT_PUBLIC_SECRET_KEY;

        if (!secret) {
            throw new Error("Secret key is required");
        }

        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(email);
        const hash = hmac.digest('hex');
        const number = parseInt(hash.substring(0, 15), 16);
        const code = number % 1000000;
        return code.toString().padStart(6, '0');
    }

}
