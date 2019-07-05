import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Devider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Header from '../../Components/Header';
import ConnectButton from '../../Components/ConnectButton';
import Chart from '../../Components/PieChart';
import Client from '../../Utils/api-client';
import FullPageSpinner from '../../Components/FullPageSpinner';
import DisconnectButton from '../../Components/DisconnectButton';

interface Account {
  id: number;
  accountType: string;
  balance: number;
  currency: string;
  referenceNumber: string;
  totalReservedAmount: number;
  totalReservedBidAmount: number;
  totalReservedWithdrawalAmount: number;
  totalReservedAndBalanceAmount: number;
}

interface Summary {
  accountId: number;
  loanAccrued: number;
  loanPrincipal: number;
  sharesValuation: number;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  title: {
    display: 'block',
    margin: 24,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  chart: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Portfolio = () => {
  const classes = useStyles();
  const initialAccounts: Account[] = [];
  const initialTypes: any = {};
  let initialIsConnected: boolean | undefined;
  const [accounts, setAccounts] = useState(initialAccounts);
  const [types, setTypes] = useState(initialTypes);
  const [isConnected, setConnected] = useState(initialIsConnected);
  const [summary, setSummary] = useState({ Main: undefined, LoanIsa: undefined });

  const handleDissconnect = (disconnected: boolean) => {
    return setConnected(disconnected ? false : true);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      // get accounts info and put in to array with account id keys
      const response = await Client({ endpoint: 'britishpearl/accounts', method: 'GET' });

      if (response.status < 400 && response.body) {
        const accounts: Account[] = response.body.items;
        accounts.forEach((account) => {
          const { id, accountType } = account;
          const update = types;
          update[id] = accountType;
          setTypes(update);
        });

        setAccounts(accounts);
        setConnected(true);
      } else {
        setConnected(false);
      }
    };

    const fetchSummary = async () => {
      // get investment summary and calculate totals
      const response = await Client({ endpoint: 'britishpearl/investment-summary', method: 'GET' });

      if (response.status < 400 && response.body) {
        const summaries: Summary[] = response.body.items;
        const accountsTotal: any = [];
        summaries.forEach((summary) => {
          const { accountId, loanAccrued, loanPrincipal, sharesValuation } = summary;
          const total = loanAccrued + loanPrincipal + sharesValuation;
          const type = types[accountId];
          accountsTotal[type] = total;
        });

        setSummary({
          Main: accountsTotal['Main'],
          LoanIsa: accountsTotal['LoanIsa'],
        });

        setConnected(true);
      } else {
        setConnected(false);
      }
    };

    fetchAccounts().then(() => fetchSummary());
  }, [types]);

  const PortfolioPage = (
    <Paper className={classes.paper}>
      <Typography className={classes.title} component='h1' variant='h4' align='center'>
        Investment Portfolio
      </Typography>
      <Devider />

      {isConnected ? (
        <div>
          <div className={classes.chart}>
            <Chart Main={summary.Main} LoanIsa={summary.LoanIsa} />
          </div>
          <Devider />
          {accounts.map((account) => {
            return (
              <div key={account.referenceNumber}>
                <h2>{account.accountType}</h2>
                <h3>
                  Balance: {account.currency} {account.balance}
                </h3>
                <Devider />
                <Typography>Reference Number: {account.referenceNumber}</Typography>
                <Devider />
                <Typography>Total Reserved: {account.totalReservedAmount}</Typography>
                <Devider />
                <Typography>Total Bid: {account.totalReservedBidAmount}</Typography>
              </div>
            );
          })}
          <DisconnectButton callback={handleDissconnect} />
        </div>
      ) : (
        <ConnectButton />
      )}
      <Typography />
    </Paper>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main className={classes.layout}>{isConnected === undefined ? <FullPageSpinner /> : PortfolioPage}</main>
    </React.Fragment>
  );
};

export default Portfolio;
