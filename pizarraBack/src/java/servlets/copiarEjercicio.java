package servlets;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ldn.lineaCanvas;
import org.jdom2.Attribute;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class copiarEjercicio extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        String usr = request.getParameter("idUsr");
        String idArchivo = request.getParameter("idArchivo");
        String nombre = request.getParameter("nombre");
        String nuevoNombre = request.getParameter("nuevoNombre");
        boolean existe = false;
        try {
            String ruta = request.getRealPath("/");
            File archivoXML = new File(ruta + "\\xml\\archivos.xml");
            FileInputStream fis = new FileInputStream(archivoXML);
            SAXBuilder builder = new SAXBuilder();
            Document documento = builder.build(fis);
            Element raiz = documento.getRootElement();
            fis.close();
            ArrayList<lineaCanvas> lineas = new ArrayList<>();
            List lista = raiz.getChildren("archivo");
            Iterator ite = lista.iterator();
            while (ite.hasNext()) {
                Element elemento = (Element) ite.next();
                String ide = elemento.getAttributeValue("usuario");
                String num = elemento.getAttributeValue("numero");
                String nom = elemento.getAttributeValue("nombre");
                if (usr.compareTo(ide) == 0 && num.compareTo(idArchivo) == 0 && nom.compareTo(nombre) == 0) {
                    existe = true;
                    List listaLineas = elemento.getChildren("linea");
                    Iterator iterador = listaLineas.iterator();
                    while (iterador.hasNext()) {
                        Element elementoL = (Element) iterador.next();
                        String color = elementoL.getAttributeValue("color");
                        int x1 = Integer.parseInt(elementoL.getAttributeValue("x1"));
                        int x2 = Integer.parseInt(elementoL.getAttributeValue("x2"));
                        int y1 = Integer.parseInt(elementoL.getAttributeValue("y1"));
                        int y2 = Integer.parseInt(elementoL.getAttributeValue("y2"));
                        int lineWidth = Integer.parseInt(elementoL.getAttributeValue("lineWidth"));
                        lineas.add(new lineaCanvas(color, x1, y1, x2, y2, lineWidth));
                    }
                    break;
                }
            }
            if (existe) {
                if (!nuevoNombre.equals(nombre)) {
                    Element archivo = new Element("archivo");
                    archivo.setAttribute(new Attribute("numero", (contarTotalEjercicios(ruta, usr)) + ""));
                    archivo.setAttribute(new Attribute("nombre", nuevoNombre));
                    archivo.setAttribute(new Attribute("usuario", usr));
                    for (lineaCanvas linea : lineas) {
                        Element line = new Element("linea");
                        line.setAttribute(new Attribute("color", linea.getColor()));
                        line.setAttribute(new Attribute("x1", linea.getX1() + ""));
                        line.setAttribute(new Attribute("y1", linea.getY1() + ""));
                        line.setAttribute(new Attribute("x2", linea.getX2() + ""));
                        line.setAttribute(new Attribute("y2", linea.getY2() + ""));
                        line.setAttribute(new Attribute("lineWidth", linea.getLineWidth() + ""));
                        archivo.addContent(line);
                    }
                    raiz.addContent(archivo);
                    documento.setContent(raiz);
                    XMLOutputter xmlOutput = new XMLOutputter();
                    xmlOutput.setFormat(Format.getPrettyFormat());
                    xmlOutput.output(documento, new FileWriter(ruta + "\\xml\\archivos.xml"));
                    response.getWriter().print("copiado");
                }
            }
        } catch (Exception e) {
            response.getWriter().print(e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    public int contarTotalEjercicios(String ruta, String usr) {
        int regreso = 0;
        try {
            SAXBuilder builder = new SAXBuilder();
            File archivoXML = new File(ruta + "\\xml\\archivos.xml");
            Document documento = builder.build(archivoXML);
            Element raiz = documento.getRootElement();
            List lista = raiz.getChildren("archivo");

            for (int i = 0; i < lista.size(); i++) {
                Element elemento = (Element) lista.get(i);
                String ide = elemento.getAttributeValue("usuario");
                if (usr.compareTo(ide) == 0) {
                    if (regreso < Integer.parseInt(elemento.getAttributeValue("numero"))) {
                        regreso = Integer.parseInt(elemento.getAttributeValue("numero")) + 1;
                    }
                }
            }

        } catch (Exception e) {
            regreso = -1;
        }
        return regreso;
    }

}
