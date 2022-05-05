import React, { useContext } from "react";
import income from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import total from "../../assets/total.svg";
import { Container } from "./style";
import { TransactionsContext } from '../../hooks/useTransactions';

export function Summary() {
    const { transactions }  = useContext(TransactionsContext);

  
    const summary =transactions.reduce((acc, transaction) => {

        if (transaction.type == 'deposit') {
            acc.desposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }
        return acc;
    }, {
        desposits: 0,
        withdraws: 0,
        total: 0,
    })

   
    return (
        <Container>
            <div>
                <header>
                   <p>Entradas</p> 
                   <img src={income} alt="Entradas"/>
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(summary.desposits)}
                    </strong>
            </div>
                <div>
                    <header>
                    <p>Saidas</p> 
                    <img src={outcome} alt="Saidas"/>
                    </header>
                    <strong>
                    {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(summary.withdraws)}
                        </strong>
                </div>
                    <div className="highlight-background">
                        <header>
                        <p>Total</p> 
                        <img src={total} alt="Total"/>
                        </header>
                        <strong>
                            {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(summary.total)}</strong>
                    </div>

        </Container>
    );
}