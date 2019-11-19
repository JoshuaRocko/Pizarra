package servlets;

import com.google.gson.Gson;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
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

public class servletTablaArchivos extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        
        if (request.getParameter("idUsr") != null) {
            String idUsr = request.getParameter("idUsr");
            ArrayList<String> ejercicios = new ArrayList<>();
            try {
                SAXBuilder builder = new SAXBuilder();
                String ruta = request.getRealPath("/");
                File archivoXML = new File(ruta + "\\xml\\archivos.xml");
                Document documento = builder.build(archivoXML);
                Element raiz = documento.getRootElement();
                List lista = raiz.getChildren("archivo");
                for (int i = 0; i < lista.size(); i++) {
                    Element elemento = (Element) lista.get(i);
                    String ide = elemento.getAttributeValue("usuario");
                    if (idUsr.compareTo(ide) == 0) {
                        ejercicios.add(elemento.getAttributeValue("numero"));
                    }
                }
                if (!ejercicios.isEmpty()) {
                    String json = new Gson().toJson(ejercicios);
                    response.getWriter().print(json);
                }
            } catch (JDOMException e) {
                e.printStackTrace();
            }
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }
}
