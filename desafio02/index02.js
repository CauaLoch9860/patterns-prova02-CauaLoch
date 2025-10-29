// --- 1. A Implementação (Implementor Interface) ---
// Define a interface para todas as classes de implementação (dispositivos).
class Device {
    /**
     * @abstract
     */
    turnOn() {
      throw new Error("O método turnOn() deve ser implementado.");
    }
    /**
     * @abstract
     */
    turnOff() {
      throw new Error("O método turnOff() deve ser implementado.");
    }
    /**
     * @abstract
     */
    getName() {
      throw new Error("O método getName() deve ser implementado.");
    }
  }
  
  // --- 2. Implementações Concretas (Concrete Implementors) ---
  // Estas são as classes de implementação que variam.
  
  class TV extends Device {
    turnOn() {
      console.log("[TV] A TV está ligada.");
    }
    turnOff() {
      console.log("[TV] A TV está desligada.");
    }
    getName() {
      return "TV";
    }
  }
  
  class Radio extends Device {
    turnOn() {
      console.log("[Radio] O Rádio está ligado e sintonizando a rádio.");
    }
    turnOff() {
      console.log("[Radio] O Rádio está desligado.");
    }
    getName() {
      return "Radio";
    }
  }
  
  // --- 3. A Abstração (Abstraction) ---
  // Esta é a classe de controle (o RemoteControl). Ela mantém uma referência
  // para a interface de implementação (Device).
  
  class RemoteControl {
    /**
     * O construtor recebe a Implementação (Device).
     * @param {Device} device - O dispositivo (TV ou Radio) a ser controlado.
     */
    constructor(device) {
      this.device = device; // ESTA É A PONTE (BRIDGE)!
      console.log(`\nControle configurado para o dispositivo: ${this.device.getName()}.`);
    }
  
    pressPowerButton(on) {
      console.log(`\n[RemoteControl] Usuário pressiona o botão de LIGAR/DESLIGAR.`);
      if (on) {
        this.device.turnOn();
      } else {
        this.device.turnOff();
      }
    }
    
    // O RemoteControl pode ter lógica de controle geral
    volumeUp() {
        console.log(`[RemoteControl] Aumentando volume no(a) ${this.device.getName()}.`);
    }
  }
  
  
  // --- 4. Abstrações Refinadas (Refined Abstractions) ---
  // Estendem a Abstração e adicionam funcionalidades, sem se preocupar
  // com o tipo exato de dispositivo.
  
  class AdvancedRemoteControl extends RemoteControl {
      mute() {
          console.log(`[AdvancedRemoteControl] Silenciando o(a) ${this.device.getName()}.`);
          // Aqui, poderia ter lógica específica de mute no dispositivo, se existisse.
      }
  }
  
  
  // --- Teste do Cliente (Client) ---
  
  // 1. Usando a Abstração (RemoteControl) com a implementação TV
  const myTV = new TV();
  const remoteTV = new RemoteControl(myTV); // A ponte é criada aqui!
  remoteTV.pressPowerButton(true);
  remoteTV.volumeUp();
  remoteTV.pressPowerButton(false);
  
  // 2. Usando a Abstração Refinada (AdvancedRemoteControl) com a implementação Radio
  const myRadio = new Radio();
  const remoteRadio = new AdvancedRemoteControl(myRadio);
  remoteRadio.pressPowerButton(true);
  remoteRadio.mute();
  remoteRadio.pressPowerButton(false);