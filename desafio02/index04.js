// --- 1. Componente Concreto (Concrete Component) ---
// O objeto original que receberá as funcionalidades adicionais.
class Message {
  constructor(text) {
    this.text = text;
  }

  // O método central (a interface do Componente)
  getText() {
    return this.text;
  }
}

// --- 2. Decorador Base (Base Decorator) ---
// Mantém a referência para o objeto "envelopado" e delega o trabalho.
// Ele implementa a mesma interface do Componente (o método getText()).
class MessageDecorator {
  /**
   * @param {Message | MessageDecorator} component - O objeto a ser decorado.
   */
  constructor(component) {
    this.component = component;
  }

  // Delega para o componente envolvido.
  getText() {
    return this.component.getText();
  }
}

// --- 3. Decoradores Concretos (Concrete Decorators) ---
// Adicionam funcionalidades específicas ao resultado.

// Decorador 1: Transforma o texto em maiúsculas
class UppercaseDecorator extends MessageDecorator {
  getText() {
    // Adiciona a funcionalidade antes/depois de chamar o componente base.
    const text = super.getText();
    console.log('[Decorator: Uppercase] Transformando para maiúsculas.');
    return text.toUpperCase();
  }
}

// Decorador 2: Adiciona um cabeçalho
class HeaderDecorator extends MessageDecorator {
  /**
   * @param {Message | MessageDecorator} component - O objeto a ser decorado.
   * @param {string} header - O cabeçalho a ser adicionado.
   */
  constructor(component, header) {
    super(component);
    this.header = header;
  }

  getText() {
    const text = super.getText();
    console.log('[Decorator: Header] Adicionando um cabeçalho.');
    return `--- ${this.header} ---\n${text}`;
  }
}

// --- Cliente (Client) ---

// Mensagem original
const msg = new Message("hoje o dia está horrível");
console.log("\n--- MENSAGEM ORIGINAL ---");
console.log(msg.getText());

// Aplicação de um Decorator
const uppercasedMsg = new UppercaseDecorator(msg);
console.log("\n--- DECORATOR SIMPLES (MAIÚSCULAS) ---");
console.log(uppercasedMsg.getText());

// Empilhamento de Decorators (o poder do padrão!)
// 1. Cria a mensagem original: msg
// 2. Decora com Uppercase: uppercasedMsg
// 3. Decora o resultado anterior (uppercasedMsg) com Header
const finalMsg = new HeaderDecorator(uppercasedMsg, "AVISO URGENTE");
console.log("\n--- DECORATOR EMPILHADO (HEADER + MAIÚSCULAS) ---");
console.log(finalMsg.getText());