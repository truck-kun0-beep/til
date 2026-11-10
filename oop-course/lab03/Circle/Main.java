class Circle {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        if (radius > 0) {
            this.radius = radius;
        } else {
            System.out.println("Radius must be greater than 0.");
        }
    }

    public double calculateArea() {
        return Math.PI * radius * radius;
    }

    public double calculateCircumference() {
        return 2 * Math.PI * radius;
    }
}

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(7);

        System.out.println("Radius = " + c.getRadius());
        System.out.printf("Area = %.2f%n", c.calculateArea());
        System.out.printf("Circumference = %.2f%n",
                c.calculateCircumference());

        c.setRadius(10);

        System.out.println();
        System.out.println("Updated:");
        System.out.println("Radius = " + c.getRadius());
        System.out.printf("Area = %.2f%n", c.calculateArea());
        System.out.printf("Circumference = %.2f%n", c.calculateCircumference());
    }
}
