import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // declarations
  public numberMatriz: FormControl = new FormControl(7);
  public cadena: string[] = [];
  public characters: string[] = ['A', 'A', 'A', 'X', 'X', 'X', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  public matriz = [
    ['B', 'B', 'D', 'A', 'D', 'E', 'F'],
    ['B', 'X', 'C', 'D', 'D', 'J', 'K'],
    ['H', 'Y', 'I', '3', 'D', 'D', '3'],
    ['R', '7', 'O', 'Ñ', 'G', 'D', '2'],
    ['W', 'N', 'S', 'P', 'E', '0', 'D'],
    ['A', '9', 'C', 'D', 'D', 'E', 'F'],
    ['B', 'X', 'D', 'D', 'D', 'J', 'K']
  ];

  // otros ejemplos
  // ['B', 'X', 'D', 'A', 'D', 'E', 'F'],
  // ['B', 'X', 'C', 'D', 'D', 'J', 'K'],
  // ['H', 'X', 'I', '3', 'D', 'D', '3'],
  // ['R', 'X', 'O', 'Ñ', 'G', 'D', '2'],
  // ['W', 'X', 'S', 'P', 'E', '0', 'D'],
  // ['A', 'X', 'C', 'D', 'D', 'E', 'F'],
  // ['B', 'X', 'D', 'D', 'D', 'J', 'K']

  public patron = [{ x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }];

  ngOnInit(): void {
    console.log('this.matriz...');
    console.log(this.matriz);
    console.log('this.matriz...');
  }

  // se encarga de hacer el proceso de buscar la cadena más
  // larga, según patrón de busqueda
  public search(corX: number, corY: number) {
    if (corX < this.matriz.length && corY < this.matriz.length) {
      const element = this.matriz[corY][corX];
      this.patron.forEach(pat => {
        const cadena: string[] = [];
        cadena.push(element);
        let corXPat = corX;
        let corYPat = corY;
        const recursive = () => {
          corXPat += pat.x;
          corYPat += pat.y;
          if ((corXPat < this.matriz.length && corXPat >= 0) && (corYPat < this.matriz.length && corYPat >= 0)) {
            const elementPat = this.matriz[corYPat][corXPat];
            if (element === elementPat) {
              cadena.push(elementPat);
              recursive();
            }
          }
        }
        recursive();
        if (cadena.length > this.cadena.length) {
          this.cadena = cadena;
        }
      });
    }
  }

  // gatilla calculo de cadena más larga, no diferencía entre cadenas del mismo largo
  public gatillo() {
    for (let x = 0; x < this.matriz.length; x++) {
      for (let j = 0; j < this.matriz.length; j++) {
        this.search(x, j);
      }
    }
  }

  // genera matriz en abse a numero ingresado
  public matrizRandom() {
    this.cadena = [];
    this.matriz = [];
    for (let x = 0; x < this.numberMatriz.value; x++) {
      const fila = [];
      for (let j = 0; j < this.numberMatriz.value; j++) {
        const element = this.characters[Math.floor(Math.random() * this.characters.length)];
        fila.push(element);
      }
      this.matriz[x] = fila;
    }

    console.log('this.matriz...');
    console.log(this.matriz);
    console.log('this.matriz...');
  }
}
