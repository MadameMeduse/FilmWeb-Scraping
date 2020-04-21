# FilmWeb scraper with Puppeteer

  

## To run the aplication 
 
 You can use your own credentials for filmweb account. Simply run this in terminal:

`node index.js login password`


Program, który **scrapuje**  za pomocą **Puppeteer** listę ocenionych filmów użytkownika w serwisie filmweb.pl. Program powinien:

-   Przyjąć login i hasło jako argumenty
    
-   Przejść na stronę ​https://www.filmweb.pl i z tego miejsca rozpocząć proces logowania się na konto użytkownika
    
-   Znaleźć listę filmów ocenionych przez użytkownika (h​ ttps://www.filmweb.pl/user/.../films lub profil -> OCENY)
    
-   Pobrać i wypisać do konsoli dane na temat wszystkich filmów ocenionych przez użytkownika w formacie JSON:
    
    -   Tytuł
        
    -   Ocena użytkownika
        
    -   Ocena społeczności
        
    -   Rok produkcji
        
    -   Gatunek