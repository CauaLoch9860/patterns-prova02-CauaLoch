// 1. Target (Interface Esperada pelo Cliente) - Implícita no PaymentProcessor, que espera 'makePayment'.

// 2. Adaptee (Sistema que precisa ser adaptado)
class ModernPaymentAPI {
    /**
     * Processa o pagamento em centavos (o formato do sistema moderno).
     * @param {number} amountInCents - Valor do pagamento em centavos.
     */
    process(amountInCents) {
      console.log(`[ModernPaymentAPI] Pagamento de R$${amountInCents / 100} via API moderna. (Dados brutos: ${amountInCents} centavos)`);
    }
  }
  
  // 3. Adapter (O Adaptador) - Transforma a interface do Adaptee para a Target.
  class ModernPaymentAdapter {
    /**
     * @param {ModernPaymentAPI} modernApi - A instância do sistema moderno a ser adaptada.
     */
    constructor(modernApi) {
      this.modernApi = modernApi;
    }
  
    /**
     * Implementa o método esperado pelo cliente (a interface Target).
     * @param {number} amount - Valor do pagamento em Reais (o formato do cliente).
     */
    makePayment(amount) {
      // A LÓGICA DE ADAPTAÇÃO:
      // Converte o valor de Reais (o que o cliente envia) para Centavos
      // (o que o sistema moderno espera).
      const amountInCents = amount * 100;
      
      console.log(`[ModernPaymentAdapter] Adaptando pagamento de R$${amount} para ${amountInCents} centavos.`);
      
      // Chama o método do sistema moderno com o formato adaptado.
      this.modernApi.process(amountInCents);
    }
  }
  
  // 4. Client (O Cliente) - Não precisa mudar, ele só interage com a interface 'makePayment'.
  class PaymentProcessor {
    /**
     * @param {LegacyPaymentSystem|ModernPaymentAdapter} system - O sistema de pagamento (ou seu adaptador).
     */
    constructor(system) {
      this.system = system;
    }
  
    /**
     * O cliente usa a interface Target comum, sem se preocupar se é legado ou adaptado.
     * @param {number} amount - O valor do pagamento.
     */
    pay(amount) {
      console.log(`\n--- Processando pagamento de R$${amount} ---`);
      this.system.makePayment(amount);
      console.log('--- Pagamento concluído. ---');
    }
  }
  
  // --- Teste do Cliente com os dois Sistemas ---
  
  // Caso 1: Sistema Legado (Não precisa de adaptador)
  class LegacyPaymentSystem {
    makePayment(amount) {
      console.log(`[LegacyPaymentSystem] Pagando R$${amount} com sistema legado.`);
    }
  }
  const legacySystem = new LegacyPaymentSystem();
  const legacyProcessor = new PaymentProcessor(legacySystem);
  legacyProcessor.pay(100);
  
  // Caso 2: Sistema Moderno (Precisa de adaptador)
  const modernApi = new ModernPaymentAPI();
  // Cria a instância do Adaptador, passando a API moderna para ele.
  const modernAdapter = new ModernPaymentAdapter(modernApi);
  const modernProcessor = new PaymentProcessor(modernAdapter);
  modernProcessor.pay(50.75); // O cliente envia 50.75 Reais