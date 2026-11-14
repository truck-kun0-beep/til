class Rectangle {
    double width;
    double height;

    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    double area() {
        return width * height;
    }

    double perimeter() {
        return 2 * (width + height);
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle(8, 5);

        System.out.println("Area: " + r1.area());
        System.out.println("Perimeter: " + r1.perimeter());

    }
}
