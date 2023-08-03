class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;
            
            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                    )
                    {
                        swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

//Dijkstra's algorithm only works on a weighted graph.
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; //to return at end
    let smallest;
    //build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // as long as there is something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        //WE ARE DONE
        //BUILD UP PATH TO RETURN AT END
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          //find neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];
          //calculate new distance to neighboring node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            //updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            //updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            //enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

//coordenadas
const coordenadas = {
  entrada: [89.39, 799.72], //1
  economia: [51.1, 733.91],
  dga: [73.13, 716.72],
  cerseu: [182.84, 693.23],
  direccion_escuela_cc: [182.84, 612.55],
  usgom: [182.84, 568],
  escaleras_pabellon_antiguo_A: [182.84, 514.24],
  sshh_pabellon_antiguo: [182.84, 441.4],
  auditorio: [204.48, 326.8],
  aulas_pabellon_nuevo_A: [99.48, 46.26],
  escaleras_pabellon_nuevo_A: [236.74, 44.69],
  aulas_pabellon_nuevo_B: [489.61, 44.69],
  escaleras_pabellon_nuevo_B: [749.97, 44.69],
  sshh_pabellon_nuevo: [405.79, 85.8],
  salida_patio: [288.93, 382.51],
  losa_deportiva: [632.22, 409.3],
  capilla: [675.62, 489.77],
  aulas_pabellon_antiguo_A: [597.83, 587.52],
  aulas_pabellon_antiguo_B: [483.96, 633.78],
  escaleras_entrada: [204.29, 762.88],
  modulo_atencion_docente: [126.16, 782.18],
  pasillo_a: [89.39, 781.19],
  pasillo_b: [89.39, 733.91],
  pasillo_c: [73.13, 733.91],
  pasillo_d: [204.48, 733.91],
  pasillo_e: [236.74, 731.65],
  pasillo_f: [236.74, 693.23],
  pasillo_g: [236.74, 612.55],
  pasillo_h: [483.96, 610.65],
  pasillo_i: [597.83, 610.65],
  pasillo_j: [236.74, 566.67],
  pasillo_k: [236.74, 514.24],
  pasillo_l: [236.74, 439.75],
  pasillo_m: [236.74, 383.28],
  pasillo_n: [236.74, 326.8],
  pasillo_o: [236.74, 68.83],
  pasillo_p: [99.48, 68.83],
  pasillo_q: [405.79, 68.83],
  pasillo_r: [489.61, 68.83],
  pasillo_s: [749.97, 68.83],
  patio_a: [501.83, 414.9],
  patio_b: [501.83, 479.62],
  patio_c: [675.62, 479.62]
  
}; 

//grafo
function pesoNodos(puntoA, puntoB, eje) {
if (eje == "x") {
  return Math.abs(coordenadas[puntoA][0] - coordenadas[puntoB][0]);
} else {
  return Math.abs(coordenadas[puntoA][1] - coordenadas[puntoB][1]);
}
}


function recorridoDijsktra(){
  const inicio = document.getElementById('inicio').value;
  const final = document.getElementById('final').value;
  var graph = new WeightedGraph();
  graph.addVertex("entrada");
  graph.addVertex("economia");
  graph.addVertex("dga");
  graph.addVertex("cerseu");
  graph.addVertex("direccion_escuela_cc");
  graph.addVertex("usgom");
  graph.addVertex("escaleras_pabellon_antiguo_A");
  graph.addVertex("sshh_pabellon_antiguo");
  graph.addVertex("auditorio");
  graph.addVertex("aulas_pabellon_nuevo_A");
  graph.addVertex("escaleras_pabellon_nuevo_A");
  graph.addVertex("aulas_pabellon_nuevo_B");
  graph.addVertex("escaleras_pabellon_nuevo_B");
  graph.addVertex("sshh_pabellon_nuevo");
  graph.addVertex("salida_patio");
  graph.addVertex("losa_deportiva");
  graph.addVertex("capilla");
  graph.addVertex("aulas_pabellon_antiguo_A");
  graph.addVertex("aulas_pabellon_antiguo_B");
  graph.addVertex("escaleras_entrada");
  graph.addVertex("modulo_atencion_docente");

  graph.addVertex("pasillo_a");
  graph.addVertex("pasillo_b");
  graph.addVertex("pasillo_c");
  graph.addVertex("pasillo_d");
  graph.addVertex("pasillo_e");
  graph.addVertex("pasillo_f");
  graph.addVertex("pasillo_g");
  graph.addVertex("pasillo_h");
  graph.addVertex("pasillo_i");
  graph.addVertex("pasillo_j");
  graph.addVertex("pasillo_k");
  graph.addVertex("pasillo_l");
  graph.addVertex("pasillo_m");
  graph.addVertex("pasillo_n");
  graph.addVertex("pasillo_o");
  graph.addVertex("pasillo_p");
  graph.addVertex("pasillo_q");
  graph.addVertex("pasillo_r");
  graph.addVertex("pasillo_s");
  graph.addVertex("patio_a");
  graph.addVertex("patio_b");
  graph.addVertex("patio_c");

  
  graph.addEdge("entrada", "pasillo_a", pesoNodos("entrada", "pasillo_a", "y"));
  
  graph.addEdge("pasillo_a", "entrada", pesoNodos("pasillo_a", "entrada", "y"));
  graph.addEdge("pasillo_a", "modulo_atencion_docente", pesoNodos("pasillo_a", "modulo_atencion_docente", "x"));
  graph.addEdge("pasillo_a", "pasillo_b", pesoNodos("pasillo_a", "pasillo_b", "y"));
  
  graph.addEdge("modulo_atencion_docente", "pasillo_a", pesoNodos("modulo_atencion_docente", "pasillo_a", "x"));

  graph.addEdge("pasillo_b", "pasillo_a", pesoNodos("pasillo_b", "pasillo_a", "y"));
  graph.addEdge("pasillo_b", "pasillo_c", pesoNodos("pasillo_b", "pasillo_c", "x"));
  graph.addEdge("pasillo_b", "pasillo_d", pesoNodos("pasillo_b", "pasillo_d", "x"));

  graph.addEdge("pasillo_c", "economia", pesoNodos("pasillo_c", "economia", "x"));
  graph.addEdge("pasillo_c", "dga", pesoNodos("pasillo_c", "dga", "y"));
  graph.addEdge("pasillo_c", "pasillo_b", pesoNodos("pasillo_c", "pasillo_b", "x"));

  graph.addEdge("economia", "pasillo_c", pesoNodos("economia", "pasillo_c", "x"));

  graph.addEdge("dga", "pasillo_c", pesoNodos("dga", "pasillo_c", "y"))

  graph.addEdge("escaleras_entrada", "pasillo_d", pesoNodos("escaleras_entrada", "pasillo_d", "y"));

  graph.addEdge("pasillo_d", "pasillo_b", pesoNodos("pasillo_d", "pasillo_b", "x"));
  graph.addEdge("pasillo_d", "escaleras_entrada", pesoNodos("pasillo_d", "escaleras_entrada", "y"));
  graph.addEdge("pasillo_d", "pasillo_e", pesoNodos("pasillo_d", "pasillo_e", "x"));

  graph.addEdge("pasillo_e", "pasillo_d", pesoNodos("pasillo_e", "pasillo_d", "x"));
  graph.addEdge("pasillo_e", "pasillo_f", pesoNodos("pasillo_e", "pasillo_f", "y"));

  graph.addEdge("pasillo_f", "cerseu", pesoNodos("pasillo_f", "cerseu", "x"));
  graph.addEdge("pasillo_f", "pasillo_e", pesoNodos("pasillo_f", "pasillo_e", "y"));
  graph.addEdge("pasillo_f", "pasillo_g", pesoNodos("pasillo_f", "pasillo_g", "y"));

  graph.addEdge("cerseu", "pasillo_f", pesoNodos("cerseu", "pasillo_f", "x"));

  graph.addEdge("pasillo_g", "pasillo_f", pesoNodos("pasillo_g", "pasillo_f", "y"));
  graph.addEdge("pasillo_g", "direccion_escuela_cc", pesoNodos("pasillo_g", "direccion_escuela_cc", "x"));
  graph.addEdge("pasillo_g", "pasillo_j", pesoNodos("pasillo_g", "pasillo_j", "y"));
  graph.addEdge("pasillo_g", "pasillo_h", pesoNodos("pasillo_g", "pasillo_h", "x"));

  graph.addEdge("pasillo_h", "pasillo_g", pesoNodos("pasillo_h", "pasillo_g", "x"));
  graph.addEdge("pasillo_h", "aulas_pabellon_antiguo_B", pesoNodos("pasillo_h", "aulas_pabellon_antiguo_B", "y"));
  graph.addEdge("pasillo_h", "pasillo_i", pesoNodos("pasillo_h", "pasillo_i", "x"));
  
  graph.addEdge("pasillo_i", "pasillo_h", pesoNodos("pasillo_i", "pasillo_h", "x"));
  graph.addEdge("pasillo_i", "aulas_pabellon_antiguo_A", pesoNodos("pasillo_i", "aulas_pabellon_antiguo_A", "y"));
  
  graph.addEdge("aulas_pabellon_antiguo_B", "pasillo_h", pesoNodos("aulas_pabellon_antiguo_B", "pasillo_h", "y"));

  graph.addEdge("aulas_pabellon_antiguo_A", "pasillo_i", pesoNodos("aulas_pabellon_antiguo_B", "pasillo_i", "y"));

  graph.addEdge("pasillo_j", "usgom", pesoNodos("pasillo_j", "usgom", "x"));
  graph.addEdge("pasillo_j", "pasillo_g", pesoNodos("pasillo_j", "pasillo_g", "y"));
  graph.addEdge("pasillo_j", "pasillo_k", pesoNodos("pasillo_j", "pasillo_k", "y"));
  
  graph.addEdge("usgom", "pasillo_j", pesoNodos("usgom", "pasillo_j", "y"));
  
  graph.addEdge("pasillo_k", "escaleras_pabellon_antiguo_A", pesoNodos("pasillo_k", "escaleras_pabellon_antiguo_A", "x"));
  graph.addEdge("pasillo_k", "pasillo_j", pesoNodos("pasillo_j", "pasillo_j", "y"));
  graph.addEdge("pasillo_k", "pasillo_l", pesoNodos("pasillo_j", "pasillo_l", "y"));
  
  graph.addEdge("escaleras_pabellon_antiguo_A", "pasillo_k", pesoNodos("escaleras_pabellon_antiguo_A", "pasillo_k", "x"));

  graph.addEdge("pasillo_l", "sshh_pabellon_antiguo", pesoNodos("pasillo_l", "sshh_pabellon_antiguo", "x"));
  graph.addEdge("pasillo_l", "pasillo_k", pesoNodos("pasillo_l", "pasillo_k", "y"));
  graph.addEdge("pasillo_l", "pasillo_m", pesoNodos("pasillo_l", "pasillo_m", "y"));
  
  graph.addEdge("sshh_pabellon_antiguo", "pasillo_l", pesoNodos("sshh_pabellon_antiguo", "pasillo_l", "x"));
  
  graph.addEdge("pasillo_m", "salida_patio", pesoNodos("pasillo_m", "salida_patio", "x"));
  graph.addEdge("pasillo_m", "pasillo_l", pesoNodos("pasillo_m", "pasillo_l", "y"));
  graph.addEdge("pasillo_m", "pasillo_n", pesoNodos("pasillo_m", "pasillo_n", "y"));
  
  graph.addEdge("pasillo_n", "auditorio", pesoNodos("pasillo_n", "auditorio", "x"));
  graph.addEdge("pasillo_n", "pasillo_m", pesoNodos("pasillo_n", "pasillo_m", "y"));
  graph.addEdge("pasillo_n", "pasillo_o", pesoNodos("pasillo_n", "pasillo_o", "y"));
  
  graph.addEdge("auditorio", "pasillo_n", pesoNodos("auditorio", "pasillo_n", "x"));
  
  graph.addEdge("pasillo_o", "pasillo_p", pesoNodos("pasillo_o", "pasillo_p", "x"));
  graph.addEdge("pasillo_o", "pasillo_q", pesoNodos("pasillo_o", "pasillo_q", "x"));
  graph.addEdge("pasillo_o", "pasillo_n", pesoNodos("pasillo_o", "pasillo_n", "y"));
  graph.addEdge("pasillo_o", "escaleras_pabellon_nuevo_A", pesoNodos("pasillo_o", "escaleras_pabellon_nuevo_A", "y"));
  
  graph.addEdge("escaleras_pabellon_nuevo_A", "pasillo_o", pesoNodos("escaleras_pabellon_nuevo_A", "pasillo_o", "y"));
  
  graph.addEdge("pasillo_p", "pasillo_o", pesoNodos("pasillo_p", "pasillo_o", "x"));
  graph.addEdge("pasillo_p", "aulas_pabellon_nuevo_A", pesoNodos("pasillo_p", "aulas_pabellon_nuevo_A", "y"));
  
  graph.addEdge("aulas_pabellon_nuevo_A", "pasillo_p", pesoNodos("aulas_pabellon_nuevo_A", "pasillo_p", "y"));
  
  graph.addEdge("pasillo_q", "pasillo_o", pesoNodos("pasillo_q", "pasillo_o", "x"));
  graph.addEdge("pasillo_q", "pasillo_r", pesoNodos("pasillo_q", "pasillo_r", "x"));
  graph.addEdge("pasillo_q", "sshh_pabellon_nuevo", pesoNodos("pasillo_q", "sshh_pabellon_nuevo", "y"));
  
  graph.addEdge("sshh_pabellon_nuevo", "pasillo_q", pesoNodos("sshh_pabellon_nuevo", "pasillo_q", "y"));
  
  graph.addEdge("pasillo_r", "pasillo_q", pesoNodos("pasillo_r", "pasillo_q", "x"));
  graph.addEdge("pasillo_r", "pasillo_s", pesoNodos("pasillo_r", "pasillo_s", "x"));
  graph.addEdge("pasillo_r", "aulas_pabellon_nuevo_B", pesoNodos("pasillo_r", "aulas_pabellon_nuevo_B", "y"));
  
  graph.addEdge("aulas_pabellon_nuevo_B", "pasillo_r", pesoNodos("aulas_pabellon_nuevo_B", "pasillo_r", "y"));

  graph.addEdge("pasillo_s", "escaleras_pabellon_nuevo_B", pesoNodos("pasillo_s", "escaleras_pabellon_nuevo_B", "y"));
  graph.addEdge("pasillo_s", "pasillo_r", pesoNodos("pasillo_s", "pasillo_r", "x"));
  
  graph.addEdge("escaleras_pabellon_nuevo_B", "pasillo_s", pesoNodos("escaleras_pabellon_nuevo_B", "pasillo_s", "y"));
  
  graph.addEdge("salida_patio", "pasillo_m", pesoNodos("salida_patio", "pasillo_m", "x"));
  graph.addEdge("salida_patio", "patio_a", pesoNodos("salida_patio", "patio_a", "x"));
  
  graph.addEdge("patio_a", "salida_patio", pesoNodos("patio_a", "salida_patio", "x"));
  graph.addEdge("patio_a", "losa_deportiva", pesoNodos("patio_a", "losa_deportiva", "x"));
  graph.addEdge("patio_a", "patio_b", pesoNodos("patio_a", "patio_b", "y"));
  
  graph.addEdge("losa_deportiva", "patio_a", pesoNodos("losa_deportiva", "patio_a", "x"));

  graph.addEdge("patio_b", "patio_a", pesoNodos("patio_b", "patio_a", "x"));
  graph.addEdge("patio_b", "patio_c", pesoNodos("patio_b", "patio_c", "y"));

  graph.addEdge("patio_c", "patio_b", pesoNodos("patio_c", "patio_b", "x"));
  graph.addEdge("patio_c", "capilla", pesoNodos("patio_c", "capilla", "y"));

 
  const arreglo = graph.Dijkstra(inicio, final);
  
  const primerElementoEntrada = coordenadas.entrada[0];
  console.log(coordenadas.entrada[1]); // Salida: 89.39
  console.log(coordenadas.pasillo_a[1]);
  console.log(coordenadas.entrada[1]-coordenadas.pasillo_a[1]);

  const restaY = coordenadas.pasillo_a[1]-coordenadas.entrada[1];
  console.log(restaY);
  console.log(Math.abs(restaY))

  // Obtener el elemento SVG
  const svg = document.querySelector('svg');
  // Obtener todas las líneas que tienen la clase "recorrido-linea" (puedes asignar una clase específica a las líneas del recorrido)
  const lineasRecorrido = document.querySelectorAll('.recorrido-linea');
  // Eliminar cada línea del recorrido
  lineasRecorrido.forEach(linea => linea.remove());

  // dibujando las lineas de recorrido
  for (let i = 1; i < arreglo.length; i++) {
    const svg_lineas = document.querySelector('svg');
    const linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    
    console.log(arreglo);
    //console.log(coordenadas[arreglo[i-1]]);
    //console.log(coordenadas[arreglo[i-1]][0]+", "+coordenadas[arreglo[i-1]][1]);

    linea.setAttribute('x1', coordenadas[arreglo[i-1]][0]);
    linea.setAttribute('y1', coordenadas[arreglo[i-1]][1]);
    linea.setAttribute('x2', coordenadas[arreglo[i]][0]);
    linea.setAttribute('y2', coordenadas[arreglo[i]][1]);
    linea.setAttribute('style', 'stroke: green; stroke-width: 3.5');

    // Agregar una clase a la línea para identificarla como parte del recorrido
    linea.classList.add('recorrido-linea');

    svg_lineas.appendChild(linea);
  }
}