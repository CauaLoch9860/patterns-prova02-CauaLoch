// --- 1. Componente (Interface Comum) ---
// Define a interface comum para as Folhas (Task) e os Compostos (Project).
// Em JavaScript, usamos uma classe base ou garantimos que ambos implementem os mesmos métodos.
class Component {
  constructor(name) {
      this.name = name;
  }

  /**
   * @abstract
   * O método principal para que o cliente interaja.
   */
  showDetails() {
      throw new Error("O método showDetails() deve ser implementado.");
  }
}


// --- 2. Folha (Leaf) ---
// Representa os objetos individuais (Tasks). Não pode ter filhos.
class Task extends Component {
  constructor(name) {
      super(name);
  }

  // A Folha implementa a operação diretamente.
  showDetails(indent = 0) {
      const padding = " ".repeat(indent);
      console.log(`${padding}✅ Tarefa: ${this.name}`);
  }
}


// --- 3. Composto (Composite) ---
// Representa o agrupamento de objetos (Projects). Pode ter filhos (Tasks ou outros Projects).
class Project extends Component {
  constructor(name) {
      super(name);
      this.components = []; // Agora armazena 'Components' (Tarefas ou outros Projetos)
  }

  /**
   * Adiciona um Componente (Task ou outro Project) ao grupo.
   * @param {Component} component - O componente a ser adicionado.
   */
  add(component) {
      this.components.push(component);
  }

  /**
   * Remove um Componente.
   * @param {Component} component - O componente a ser removido.
   */
  remove(component) {
      this.components = this.components.filter(c => c !== component);
  }

  // O Composto DELEGA a operação para seus filhos.
  showDetails(indent = 0) {
      const padding = " ".repeat(indent);
      console.log(`\n${padding}📁 PROJETO: ${this.name}`);
      
      // Itera sobre os componentes e chama a operação showDetails() em cada um.
      // Se um componente for um Task, ele executa a Task.showDetails().
      // Se um componente for outro Project, ele executa o Project.showDetails() recursivamente.
      this.components.forEach((component) => {
          component.showDetails(indent + 4);
      });
  }
}


// --- Teste do Cliente (Client) ---

// 1. Criação de Folhas (Tasks)
const t1 = new Task("Escrever documentação");
const t2 = new Task("Fazer testes");

// 2. Criação de um Composto (Subprojeto)
const subprojectDev = new Project("Desenvolvimento do Módulo A");
const t3 = new Task("Implementar feature X");
subprojectDev.add(t3);

// 3. Criação do Composto Raiz (Projeto Principal)
const mainProject = new Project("Lançamento v1.0");

// Adiciona Folhas diretamente ao Projeto Principal
mainProject.add(t1);
mainProject.add(t2);

// Adiciona o Composto (Subprojeto) ao Projeto Principal
mainProject.add(subprojectDev);
const t4 = new Task("Revisão final de código");
mainProject.add(t4);


// O Cliente interage com o Composto Raiz (mainProject), sem saber se os itens
// são Tasks ou outros Projects.
console.log("--- Executando showDetails() no Projeto Principal ---");
mainProject.showDetails();