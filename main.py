import pyxel as px
import random 

WIDTH = 800
HEIGHT = 800
TAILLE_PIX = 25
INITCEL= []
nb=random.randint(0,100)
for i in range(nb):
    cell=(random.randint(0,HEIGHT//TAILLE_PIX),random.randint(0,WIDTH//TAILLE_PIX))
    INITCEL.append(cell)
class cellule:
    """ les cellules vont être la base du changement de comportement"""
    def __init__(self,x,y):
        self.etat=0
        self.etatf=0
        self.x=x
        self.y=y
        self.voisin=[]
    def update(self):
        compt=0
        for each in self.voisin:
            if each.etat==1:
                compt+=1
        if compt==0:
            self.etatf=0
        elif compt>2:
            self.etatf=0
        else:
            self.etatf=1
    def glissement(self):
        self.etat=self.etatf
    def draw(self):
        if self.etat==1:
            px.rect(self.x*(HEIGHT/TAILLE_PIX),self.y*(WIDTH/TAILLE_PIX),TAILLE_PIX,TAILLE_PIX,1)
        else:
            px.rect(self.x*(HEIGHT/TAILLE_PIX),self.y*(HEIGHT/TAILLE_PIX),TAILLE_PIX,TAILLE_PIX,3)

class App:
    """ La classe App contient les fonctions générales de l'application, qui vont appeler les 
    différentes classes"""
    def __init__(self):
        #on initialise au début 
        px.init(WIDTH,HEIGHT,title="jeu de la vie",fps=5)
        #on s'occupe des couleurs
        px.colors.from_list([0x000000,0x999999,0x000099,0x552266])
        # self.list contient des listes de celulles correspondant aux différentes colonnes
        self.list=[]
        for i in range(160):
            #Le i est mis sur les lignes
            list_cel=[]
            for j in range(160):
                #le j est mis sur les colonnes1
                cel=cellule(i,j)
                list_cel.append(cel)
            self.list.append(list_cel)
        #ensuite on setup les voisins
        for i in range(len(self.list)):
            for j in range(len(self.list[i])):
                if i!=0:
                    self.list[i][j].voisin.append(self.list[i-1][j])
                if j!=0:
                    self.list[i][j].voisin.append(self.list[i][j-1])
                if i!=len(self.list)-1:
                    self.list[i][j].voisin.append(self.list[i+1][j])
                if j!=len(self.list[0])-1:
                    self.list[i][j].voisin.append(self.list[i][j+1])
        for each in INITCEL:
            self.list[each[0]][each[1]].etat=1

        px.run(self.update,self.draw)

    def update(self):
        for each in self.list:
            for ea in each:
                ea.update()
        for each in self.list:
            for ea in each:
                ea.glissement()
        if px.btnp(px.KEY_Q):
            px.quit()
    def draw(self):
        for each in self.list:
            for ea in each:
                ea.draw()

App()