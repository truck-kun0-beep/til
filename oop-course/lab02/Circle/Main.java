class Circle {
    double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    void setRadius(double radius) {
        this.radius = radius;
    }

    double area() {
        return Math.PI * radius * radius;
    }

    double circumference() {
        return 2 * Math.PI * radius;
    }
}

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(5);

        System.out.println("Radius = " + c.radius);
        System.out.printf("Area = %.2f%n", c.area());
        System.out.printf("Circumference = %.2f%n", c.circumference());

        c.setRadius(8);

        System.out.println();
        System.out.println("Updated Circle:");
        System.out.println("Radius = " + c.radius);
        System.out.printf("Area = %.2f%n", c.area());
        System.out.printf("Circumference = %.2f%n", c.circumference());
    }
}
