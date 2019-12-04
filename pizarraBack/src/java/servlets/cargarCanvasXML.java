package servlets;

import com.google.gson.Gson;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ldn.lineaCanvas;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;

public class cargarCanvasXML extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String idArchivo = request.getParameter("idArchivo");
        String idUsr = request.getParameter("idUser");
        String nombre = request.getParameter("nombre");
        try {
            String ruta = request.getRealPath("/");
            SAXBuilder builder = new SAXBuilder();
            File archivoXML = new File(ruta + "\\xml\\archivos.xml");
            Document documento = builder.build(archivoXML);
            Element raiz = documento.getRootElement();
            ArrayList<lineaCanvas> ejercicios = new ArrayList<>();
            List lista = raiz.getChildren("archivo");
            boolean existe = false;
            for (int i = 0; i < lista.size(); i++) {
                Element elemento = (Element) lista.get(i);
                String ide = elemento.getAttributeValue("numero");
                String usr = elemento.getAttributeValue("usuario");
                String nom = elemento.getAttributeValue("nombre");
                if (idArchivo.compareTo(ide) == 0 && usr.compareTo(idUsr) == 0 && nom.compareTo(nombre) == 0) {
                    existe = true;
                    List listaLineas = elemento.getChildren("linea");
                    for (int j = 0; j < listaLineas.size(); j++) {
                        Element line = (Element) listaLineas.get(j);
                        String color = line.getAttributeValue("color");
                        int x1 = Integer.parseInt(line.getAttributeValue("x1"));
                        int x2 = Integer.parseInt(line.getAttributeValue("x2"));
                        int y1 = Integer.parseInt(line.getAttributeValue("y1"));
                        int y2 = Integer.parseInt(line.getAttributeValue("y2"));
                        int lineWidth = Integer.parseInt(line.getAttributeValue("lineWidth"));
                        ejercicios.add(new lineaCanvas(color, x1, y1, x2, y2, lineWidth));
                    }
                    break;
                }
            }

            if (existe) {
                String json = new Gson().toJson(ejercicios);

                response.getWriter().print(json);
            }
        } catch (Exception e) {
            response.getWriter().print(e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }
}
