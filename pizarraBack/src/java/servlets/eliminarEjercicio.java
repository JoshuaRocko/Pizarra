package servlets;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class eliminarEjercicio extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        String usr = request.getParameter("idUsr");
        String idArchivo = request.getParameter("idArchivo");
        String nombre = request.getParameter("nombre");
        boolean existe = false;

        try {
            String ruta = request.getRealPath("/");
            File archivoXML = new File(ruta + "\\xml\\archivos.xml");
            FileInputStream fis = new FileInputStream(archivoXML);
            SAXBuilder builder = new SAXBuilder();
            Document documento = builder.build(fis);
            Element raiz = documento.getRootElement();
            fis.close();

            List lista = raiz.getChildren("archivo");
            Iterator ite = lista.iterator();
            while (ite.hasNext()) {
                Element elemento = (Element) ite.next();
                String ide = elemento.getAttributeValue("usuario");
                String num = elemento.getAttributeValue("numero");
                String nom = elemento.getAttributeValue("nombre");
                if (usr.compareTo(ide) == 0 && num.compareTo(idArchivo) == 0 && nom.compareTo(nombre) == 0) {
                    ite.remove();
                    existe = true;
                    break;
                }
            }
            if (existe) {
                XMLOutputter xmlOutput = new XMLOutputter();
                xmlOutput.setFormat(Format.getPrettyFormat());
                xmlOutput.output(documento, new FileWriter(ruta + "\\xml\\archivos.xml"));
                response.getWriter().print("eliminado");
            } else {
                response.getWriter().print("no existe");
            }

        } catch (Exception e) {
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }
}
