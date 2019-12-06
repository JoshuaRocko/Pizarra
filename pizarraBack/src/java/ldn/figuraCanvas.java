package ldn;

public class figuraCanvas {
    String color;
    String x;
    String y;
    String tamanio;
    String tipo;

    public figuraCanvas(String color, String x, String y, String tamanio, String tipo) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.tamanio = tamanio;
        this.tipo = tipo;
    }

    public String getColor() {
        return color;
    }

    public String getX() {
        return x;
    }

    public String getY() {
        return y;
    }

    public String getTamanio() {
        return tamanio;
    }

    public String getTipo() {
        return tipo;
    }
    
}
