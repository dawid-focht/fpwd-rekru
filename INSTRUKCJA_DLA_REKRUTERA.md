# Zadanie rekrutacyjne - Debugowanie JavaScript

## Opis zadania dla kandydata

**Czas: 15-20 minut**

Otrzymujesz prostą aplikację "Task Manager" napisaną w HTML/CSS/JavaScript. Aplikacja pozwala na:
- Dodawanie nowych zadań
- Oznaczanie zadań jako ukończone
- Filtrowanie zadań (wszystkie/aktywne/ukończone)
- Usuwanie zadań

**Problem:** W aplikacji znajduje się bug związany z funkcjonalnością usuwania zadań. Twoje zadanie polega na:
1. Zidentyfikowaniu i opisaniu problemu
2. Znalezieniu przyczyny używając narzędzi deweloperskich przeglądarki
3. Zaproponowaniu poprawki

**Wskazówka:** Bug nie powoduje błędów w konsoli. Użyj debuggera w DevTools.

## Opis buga (POUFNE - tylko dla rekrutera)

### Objaw
Po dodaniu kilku zadań i użyciu filtrów, przyciski "Usuń" często usuwają niewłaściwe zadania. Problem występuje szczególnie gdy:
1. Dodamy kilka zadań
2. Oznaczymy niektóre jako ukończone
3. Przełączymy się na widok "Aktywne" lub "Ukończone"
4. Spróbujemy usunąć zadanie

### Przyczyna
Bug znajduje się w funkcji `renderTasks()` w liniach 76-85:

```javascript
for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === task.id) {
        deleteBtn.addEventListener('click', function() {
            deleteTask(i);
        });
        break;
    }
}
```

Problem polega na tym, że:
1. Zmienna `i` w pętli for jest przechwytywana przez domknięcie (closure)
2. Gdy funkcja callback jest wywoływana, używa aktualnej wartości `i`, nie tej z momentu tworzenia
3. Po przefiltrowaniu zadań, indeksy w tablicy `filteredTasks` nie odpowiadają indeksom w tablicy `tasks`
4. Funkcja `deleteTask()` otrzymuje niewłaściwy indeks

### Sposób debugowania
Kandydat powinien:
1. Otworzyć DevTools (F12)
2. Postawić breakpoint w funkcji `deleteTask()` lub w event listenerze przycisku
3. Krok po kroku prześledzić wartość zmiennej `i` i zauważyć, że nie odpowiada ona oczekiwanemu zadaniu
4. Zrozumieć problem z domknięciami w JavaScript

### Poprawne rozwiązanie
Można to naprawić na kilka sposobów:
1. Użyć `const` zamiast `let` wewnątrz pętli
2. Użyć IIFE (Immediately Invoked Function Expression)
3. Przekazać ID zadania zamiast indeksu
4. Użyć metody `findIndex()` wewnątrz `deleteTask()`

Przykład poprawki:
```javascript
deleteBtn.addEventListener('click', () => deleteTask(task.id));

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}
```

### Ocena kandydata
- **100%**: To co level niżej + podaje poprawne rozwiązanie problemu.
- **Bardzo dobra**: Kandydat szybko identyfikuje problem z closures, używa debuggera efektywnie
- **Dobra**: Znajduje bug używając debuggera, rozumie problem po wskazówkach
- **Średnia**: Znajduje bug metodą prób i błędów, potrzebuje pomocy w zrozumieniu / Znajduje buga jedynie czytając kod i poprawnie identyfikuje problem
- **Dupy nie urywa**: Próbuje czytać kod JS w zakładce sources (znajduje miejsce w kodzie, gdzie potencjalnie bug może być[wskazuje na kod, gdzie bug faktycznie jest], ale nie wie dlaczego)
- **Słaba**: błądzi w DevTools klikając randomowo w różne narzędzia/Długo zamyśla się w zakładce Console/konsola nie wiedząc co wpisać