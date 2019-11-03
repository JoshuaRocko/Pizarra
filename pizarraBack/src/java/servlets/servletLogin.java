package servlets;

import java.io.File;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

public class servletLogin extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        String ruta = request.getRealPath("/");
        String usr = request.getParameter("usr");
        String psw = request.getParameter("psw");

        try {
            SAXBuilder builder = new SAXBuilder();
            File archivoXML = new File(ruta + "\\archivoXML.xml");
            Document documento = builder.build(archivoXML);
            Element raiz = documento.getRootElement();
            List lista = raiz.getChildren("usuario");
            for (int i = 0; i < lista.size(); i++) {
                Element elemento = (Element) lista.get(i);
                String usernamexml = elemento.getAttributeValue("username");
                String passwordxml = elemento.getAttributeValue("password");
                if (usr.compareTo(usernamexml) == 0 && psw.compareTo(passwordxml) == 0) {
                    response.getWriter().print("http://www.google.com");
                } else {
                    response.getWriter().print("https://www.facebook.com/");
                }
            }
        } catch (JDOMException e) {
            e.printStackTrace();
        }
        //response.getWriter().print("Recibí Usr: " + usr + " psw: " + psw);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        /* response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.getWriter().print("Hola lola post");*/
    }
}
