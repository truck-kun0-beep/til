class Rectangle {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public double getHeight() {
        return height;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double calculateArea() {
        return width * height;
    }

    public double calculatePerimeter() {
        return 2 * (width + height);
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r = new Rectangle(6, 7);

        System.out.println("Width = " + r.getWidth());
        System.out.println("Height = " + r.getHeight());
        System.out.println("Area = " + r.calculateArea());
        System.out.println("Perimeter = " + r.calculatePerimeter());
    }
}
