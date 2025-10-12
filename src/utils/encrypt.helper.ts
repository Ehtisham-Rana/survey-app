import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET = "", SALT_ROUNDS } = process.env;

export default class Encrypt {
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
        return bcrypt.hashSync(password, salt);
    }

    static async comparePassword(password: string, hashPassword:string): Promise<boolean> {
        return bcrypt.compareSync(password, hashPassword);
    };
}
