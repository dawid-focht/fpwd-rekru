# Instrukcja dla rekrutera – Debugowanie JavaScript

> Plik tylko do wglądu rekrutera – nie udostępniaj kandydatowi.

## Cel zadania
Zweryfikować, czy kandydat:
- Potrafi systematycznie korzystać z DevTools (Debugger, Breakpoints, watch expressions itp.).
- Rozumie kontekst `this` i różnice pomiędzy funkcją strzałkową a zwykłą.
- Umie jasno zakomunikować swoje wnioski i zaproponować poprawkę.

## Krótki opis buga (poufne)
1. W pliku `app.js`, metoda `renderTasks()` dodaje listener przycisku:
   ```js
   button.addEventListener('click', this.handleDelete);
   ```
2. `handleDelete` jest zdefiniowana jako zwykła funkcja przypisana właściwości klasy:
   ```js
   handleDelete = function (e) {
       // ...
   }
   ```
3. Po kliknięciu przycisku listener wywołuje funkcję z kontekstem elementu DOM, a nie instancji `TodoApp` → `this.tasks` jest `undefined`.


## Prowadzenie zadania (na rozmowie)
1. Poproś kandydata, aby uruchomił aplikację (otwórz `index.html`).
2. Powiedz kandydatowi, że w aplikacji jest bug - nie usuwają się zadania. Niech znajdzie problem i zasugeruje rozwiązanie
3. Instrukcja dla kandydata - Może korzystać ze wszystkich narzędzi wbudowanych w przeglądarkę/devTools z wyjątkiem narzędzi AI, jeśli takie ma.
4. Obserwuj, jak korzysta z Debuggera:
   - czy ustawia breakpoint w obsłudze kliknięcia,
   - czy bada wartość `this`,
   - czy potrafi dojść do linii z błędem.
5. Całość powinna zmieścić się w 20 min.



### Co powinien powiedzieć kandydat - jako rozwiązanie? (wystarczy jedno z poniższych)
1. „Trzeba użyć **funkcji strzałkowej** (=>) wewnątrz `handleDelete`, bo ona zachowuje `this`.”  
   Przykład:  
   ```js
   handleDelete = (e) => { /* kod */ }
   ```
2. „Trzeba **związać** (`bind`) funkcję z `this` przy dodawaniu listenera.”  
   Przykład:  
   ```js
   button.addEventListener('click', this.handleDelete.bind(this));
   ```

Jeśli kandydat zaproponuje którąś z powyższych opcji (lub powie „trzeba poprawić `this`, bo jest zły kontekst”), możesz uznać, że znalazł rozwiązanie.

---


## Kryteria oceny
| Poziom | Zachowanie kandydata |
|--------|----------------------|
| **Wybitny (100 %)** | Szybko reprodukuje błąd, samodzielnie ustawia breakpoint, analizuje `this`, Sugeruje poprawne rozwiązanie. Wyjaśnia szczegółowo różnicę pomiędzy `function` a `=>`. |
| **Bardzo dobra** | Po kilku minutach wskazuje problem z kontekstem, proponuje poprawkę `.bind` lub arrow(Lambda) function. |
| **Dobra** | W miarę sprawnie znajduje problem jedynie czytając kod. Zasugeruj, żeby udowodnił, że kontekst jest inny poprzez pokazanie w debuggerze(na breakpoincie), że this nie jest tym czym powinien być - jeśli to zrobi ma 100% |
| **ok** | Korzysta z Debuggera, widzi, że `this` jest „dziwny”, ale ma trudność z powiązaniem faktów. |
| **Słaba** | Ogranicza się do Console lub czytania kodu, nie wchodzi w Debugger, nie znajduje problemu. |
