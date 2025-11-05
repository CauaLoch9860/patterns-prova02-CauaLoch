class UserValidator {
  static isValidEmail(email) {
    return email.includes("@");
  }
}

class EmailService {
  sendWelcome(email) {
    console.log(`Enviando email de boas-vindas para ${email}`);
  }
}

class UserService {
  constructor(emailService) {
    this.emailService = emailService;
  }

  createUser(userData) {
    if (!UserValidator.isValidEmail(userData.email)) {
      throw new Error("Email inválido");
    }

    console.log("Usuário criado:", userData.name);
    this.emailService.sendWelcome(userData.email);
  }
}

// Uso
const emailService = new EmailService();
const userService = new UserService(emailService);
userService.createUser({ name: "Lucas", email: "lucas@gmail.com" });
