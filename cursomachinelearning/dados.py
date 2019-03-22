import csv

def carregar_acessos():
    X = []    # dados, o que sabemos
    Y = []    # marcações, o que estamos procurando saber

    arquivo = open('acesso.csv','rt')
    leitor = csv.reader(arquivo)
    next(leitor, None)  # pula o cabeçalho

    for home,como_funciona,contato,comprou in leitor:
        dados = [int(home),int(como_funciona),int(contato)]
        X.append(dados)
        Y.append(int(comprou))

    return X, Y