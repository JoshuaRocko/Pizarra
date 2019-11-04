package servlets;

import java.io.File;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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
        String ide = "";
        String token = request.getParameter("tkn");

        if (token != null) {
            if (token.equals("24")) {
                try {
                    SAXBuilder builder = new SAXBuilder();
                    File archivoXML = new File(ruta + "\\xml\\usuarios.xml");
                    Document documento = builder.build(archivoXML);
                    Element raiz = documento.getRootElement();
                    List lista = raiz.getChildren("usuario");
                    boolean existe = false;
                    for (int i = 0; i < lista.size(); i++) {
                        Element elemento = (Element) lista.get(i);
                        String usernamexml = elemento.getAttributeValue("nombreUsr");
                        String passwordxml = elemento.getAttributeValue("contrasena");
                        if (usr.compareTo(usernamexml) == 0 && psw.compareTo(passwordxml) == 0) {
                            existe = true;
                            ide = elemento.getAttributeValue("id");
                            break;
                        }
                    }
                    if (existe) {
                        response.getWriter().print(usr);
                        HttpSession sesion = request.getSession();
                        sesion.setAttribute("idUsr", ide);
                    } else {
                        response.getWriter().print("Invalido");
                    }
                } catch (JDOMException e) {
                    e.printStackTrace();
                    response.getWriter().print("Invalido");
                }
            } else {
                response.getWriter().print("Invalido");
            }
        } else {
            response.getWriter().print("Invalido");
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
