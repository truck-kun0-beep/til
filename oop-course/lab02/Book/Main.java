import java.util.ArrayList;

class Book {
    String title;
    String author;
    String isbn;

    Book(String title, String author, String isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    void displayBookInfo() {
        System.out.print("Title: " + title);
        System.out.print(", Author: " + author);
        System.out.println(", ISBN: " + isbn);
    }
}

class Library {
    ArrayList<Book> books = new ArrayList<>();

    void addBook(Book book) {
        books.add(book);
        System.out.println("Added: " + book.title);
    }

    void removeBook(String isbn) {
        for (int i = 0; i < books.size(); i++) {
            Book b = books.get(i);
            if (b.isbn.equals(isbn)) {
                System.out.println("Removed: " + b.title);
                books.remove(i);
                return;
            }
        }
        System.out.println("No book found with ISBN " + isbn);
    }

    void showBooks() {
        System.out.println("Books in the library:");
        for (int i = 0; i < books.size(); i++) {
            System.out.print((i + 1) + ". ");
            books.get(i).displayBookInfo();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Library lib = new Library();

        lib.addBook(new Book("Learn Java", "Nabil", "1001"));
        lib.addBook(new Book("OOP Basics", "Sumaiya", "1002"));
        lib.addBook(new Book("Data Structures", "Hasan", "1003"));

        System.out.println();
        lib.showBooks();

        System.out.println();
        lib.removeBook("1002");
        lib.removeBook("9999");

        System.out.println();
        lib.showBooks();
    }
}
