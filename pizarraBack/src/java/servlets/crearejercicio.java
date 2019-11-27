package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class crearejercicio extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String idUsr = request.getParameter("idUsr");
        String idArchivo = request.getParameter("idArchivo");
        boolean ver = request.getParameter("ver") != null ? request.getParameter("ver").equals("1") : false;
        String titulo = "";

        out.println("<!DOCTYPE html>");
        out.println("<html lang=\"en\">");
        out.println("<head>");
        out.println("<meta charset=\"UTF-8\" />");
        out.println("<link rel=\"stylesheet\" href=\"styleEjercicio.css\" />");
        if (ver && idUsr != null && idArchivo != null) {
            titulo = "Ver ejercicio " + idArchivo;
            out.println("<title>" + titulo + "</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1 class=\"titulo\">" + titulo + "</h1>");
            out.println("<canvas id=\"canvas\" width=\"800\" height=\"500\"></canvas>");
            out.println("<button type=\"button\" onClick=\"window.location.href='../pizarra'\">Back</button>");
            out.println("<script src='ver.js'></script>");
        } else if (idUsr != null && idArchivo != null) {
            boolean script = false;
            if (!idArchivo.equals("nuevo")) {
                titulo = "Modificar ejercicio " + idArchivo;
                script = true;
            } else {
                titulo = "Crear ejercicio";
            }
            out.println("<title>" + titulo + "</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1 class=\"titulo\">" + titulo + "</h1>");
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
            out.println("<button type=\"button\" onClick=\"window.location.href='../pizarra'\">Back</button>");
            out.println("<script src=\"https://togetherjs.com/togetherjs-min.js\"></script>");
            if (script) {
                out.println("<script src=\"modificar.js\"></script>");
            } else {
                out.println("<script src=\"scriptCanvas.js\"></script>");
            }
        }

        out.println("<script src=\"http://code.jquery.com/jquery-latest.min.js\"></script>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
}
