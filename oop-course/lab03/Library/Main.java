import java.util.*;

class Book {
    private String title;
    private String author;
    private String isbn;

    public Book(String title, String author, String isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getIsbn() {
        return isbn;
    }
}

class Library {
    private ArrayList<Book> books = new ArrayList<>();

    public void addBook(Book book) {
        books.add(book);
        System.out.println("Added: " + book.getTitle());
    }

    public void removeBook(String isbn) {
        for (int i = 0; i < books.size(); i++) {
            Book b = books.get(i);
            if (b.getIsbn().equals(isbn)) {
                System.out.println("Removed: " + b.getTitle());
                books.remove(i);
                return;
            }
        }
        System.out.println("No book found with ISBN " + isbn);
    }

    public void showBooks() {
        System.out.println("Books in the library:");
        if (books.size() == 0) {
            System.out.println("(no books)");
        }
        for (int i = 0; i < books.size(); i++) {
            Book b = books.get(i);
            System.out.print((i + 1) + ". " + b.getTitle());
            System.out.print(" by " + b.getAuthor());
            System.out.println(" (ISBN: " + b.getIsbn() + ")");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Library lib = new Library();

        lib.addBook(new Book("Clean Code","Robert Martin", "101"));
        lib.addBook(new Book("Head First Java","Kathy Sierra", "102"));
        lib.addBook(new Book("Effective Java","Joshua Bloch", "103"));

        System.out.println();
        lib.showBooks();

        System.out.println();
        lib.removeBook("102");
        lib.removeBook("999");

        System.out.println();
        lib.showBooks();
    }
}
