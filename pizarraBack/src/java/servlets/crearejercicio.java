package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class crearejercicio extends HttpServlet {
<<<<<<< HEAD
=======

>>>>>>> saving-canvas
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
<<<<<<< HEAD
        /* TODO output your page here. You may use following sample code. */
        out.println("<html lang=\"en\">\n" +
"    <head>\n" +
"        <meta charset=\"UTF-8\" />\n" +
"        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
"        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" />\n" +
"        <link rel=\"stylesheet\" href=\"styleEjercicio.css\" />\n" +
"        <title>Crear ejercicio</title>\n" +
"    </head>\n" +
"    <body>\n" +
"        <h1 class=\"titulo\">Crear ejercicio</h1>\n" +
"        <canvas id=\"canvas\" width=\"800\" height=\"500\"></canvas>\n" +
"        <div class=\"divBotones\">\n" +
"            <button type=\"button\" id=\"#37B2F0\" class=\"btn btn1\">\n" +
"                Blue\n" +
"            </button>\n" +
"            <button type=\"button\" id=\"#F04537\" class=\"btn btn2\">\n" +
"                Red\n" +
"            </button>\n" +
"            <button type=\"button\" id=\"#F7D42A\" class=\"btn btn3\">\n" +
"                Yellow\n" +
"            </button>\n" +
"            <button type=\"button\" id=\"black\" class=\"btn btn4\">\n" +
"                Black\n" +
"            </button>\n" +
"            <button type=\"button\" id=\"#6DD02D\" class=\"btn btn5\">\n" +
"                Green\n" +
"            </button>\n" +
"            <button type=\"button\" id=\"white\" class=\"btn btn6\">\n" +
"                Erase\n" +
"            </button>\n" +
"            <button type=\"button\" id=\"increaseWidth\" class=\"btn btn5\">\n" +
"                +\n" +
"            </button>\n" +
"            <button type=\"button\" id=\"decreaseWidth\" class=\"btn btn2\">\n" +
"                -\n" +
"            </button>\n" +
"            <button onclick=\"TogetherJS(this); return false;\" class=\"btn btn1\">\n" +
"                Start TogetherJS\n" +
"            </button>\n" +
"            <script src=\"scriptCanvas.js\"></script>\n" +
"            <script src=\"https://togetherjs.com/togetherjs-min.js\"></script>\n" +
"        </div>\n" +
"    </body>\n" +
"</html>");
        
    }

=======
        out.println("<!DOCTYPE html>");
        out.println("<html lang=\"en\">");
        out.println("<head>");
        out.println("<meta charset=\"UTF-8\" />");
        out.println("<link rel=\"stylesheet\" href=\"styleEjercicio.css\" />");
        out.println("<title>Crear ejercicio</title>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1 class=\"titulo\">Crear ejercicio</h1>");
        out.println("<canvas id=\"canvas\" width=\"800\" height=\"500\"></canvas>");
        out.println("<div class=\"divBotones\">");
        out.println("<button type=\"button\" id=\"#37B2F0\" class=\"btn btn1\">Blue</button>");
        out.println("<button type=\"button\" id=\"#F04537\" class=\"btn btn2\">Red</button>");
        out.println("<button type=\"button\" id=\"#F7D42A\" class=\"btn btn3\">Yellow</button>");
        out.println("<button type=\"button\" id=\"black\" class=\"btn btn4\">Black</button>");
        out.println("<button type=\"button\" id=\"#6DD02D\" class=\"btn btn5\">Green</button>");
        out.println("<button type=\"button\" id=\"white\" class=\"btn btn6\">Erase</button>");
        out.println("<button type=\"button\" id=\"increaseWidth\" class=\"btn btn5\">+</button>");
        out.println("<button type=\"button\" id=\"decreaseWidth\" class=\"btn btn2\">-</button>");
        out.println("<button onclick=\"TogetherJS(this); return false;\" class=\"btn btn1\">Start TogetherJS</button>");
        out.println("<button type=\"button\" id=\"save\">Save</button>");
        out.println("<script src=\"https://togetherjs.com/togetherjs-min.js\"></script>");
        out.println("<script src=\"scriptCanvas.js\"></script>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
>>>>>>> saving-canvas
}
