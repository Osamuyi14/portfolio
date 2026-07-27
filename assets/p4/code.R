# TASK 1 - Telco Customer Churn Dataset
rm(list = ls())
library(MASS)

# Data preparation
data <- read.csv("C:/Users/osakp/Downloads/WA_Fn-UseC_-Telco-Customer-Churn.csv",stringsAsFactors = TRUE)

head(data)
names(data)
nrow(data)

# Convert Total Charges to numeric
data$TotalCharges <- as.numeric(as.character(data$TotalCharges))

# Output variable: Churn Yes = 1, Churn No = 0
y <- ifelse(data$Churn == 'Yes', 1, 0)

# Continuous input variables 
tenure <- data$tenure
monthly_charges <- data$MonthlyCharges
total_charges <- data$TotalCharges

# Categorical input variables
contract <- data$Contract
internet_service = data$InternetService
payment_method = data$PaymentMethod
online_security = data$OnlineSecurity

# Final dataset without missing values
df = na.omit(data.frame(tenure, monthly_charges, total_charges, contract, internet_service, payment_method, online_security, y))

head(df)
nrow(df)


# Split the data set
# (a) Train the model using 80% of this dataset and suggest an appropriate GLM
# Final data set without missing values
head(df)
nrow(df)

set.seed(32)

n = nrow(df)

# 80% train set and 20% test set

indexes = sample(n, floor(n*(80/100)))

trainset = df[indexes,]
testset = df[-indexes,]

fit = glm(y ~ ., data = trainset, family = 'binomial')

# Parameter estimation
coef(fit)

# Summary
summary(fit)

# (b) Significant variables at alpha = 0.05

# H0: Xj is not an important independent variable
# H1: Xj is an important independent variable and is selected

summary(fit)

coef(fit)

# Variables with p-values less than 0.05 are statistically significant.

# (c) Predict the output of the test dataset using the trained model

pred = predict(fit, testset, type = 'response')

yhat = rep(0, length(pred))

yhat[pred > 0.5] = 1

actual = testset$y

pred
yhat
actual

# Apply reduced model using stepAIC

step.model <- stepAIC(fit, trace = FALSE)
formula(step.model)
coef(step.model)

summary(step.model)

pred_red = predict(step.model, testset, type = 'response')

yhat_red = rep(0, length(pred_red))

yhat_red[pred_red > 0.5] = 1

actual = testset$y

# (d) Confusion matrix and accuracy

actual_f   <- factor(actual,   levels = c(0, 1))
yhat_f     <- factor(yhat,     levels = c(0, 1))
yhat_red_f <- factor(yhat_red, levels = c(0, 1))
accuracy = mean(yhat == actual)

conf_matrix <- table(Actual = actual_f, Predicted = yhat_f)
conf_matrix
accuracy <- mean(yhat == actual)
print(accuracy)

conf_matrix_red <- table(Actual = actual_f, Predicted = yhat_red_f)
conf_matrix_red
accuracy_red <- mean(yhat_red == actual)
print(accuracy_red)

# Recall = TP / (TP + FN)
Recall <- conf_matrix_red[2, 2] / (conf_matrix_red[2, 2] + conf_matrix_red[2, 1])
print(Recall)

# Precision = TP / (TP + FP)
Precision <- conf_matrix_red[2, 2] / (conf_matrix_red[2, 2] + conf_matrix_red[1, 2])
print(Precision)


#Task 2: Bayesian Inference for Poisson(lambda) data x1, ..., x10 iid Poisson(lambda)
set.seed(123)
n <- 10
lambda_true <- 4
x <- rpois(n, lambda_true)
print("Observed data (x1,...,x10)")
print(x)

sum_x <-sum(x)
print(paste("Sum of x_i =", sum_x))
print("Mean of x_i  = ")

#2a: Likelihood function
# L(lambda) = lambda^(sum x_i) * exp(-n*lambda) / prod(x_i!)
likelihood <- function(lambda, data) {
  n <- length(data)
  (lambda^sum(data)) * exp(-n * lambda) / prod(factorial(data))
}

lambda_grid <- seq(0.01, 10, by = 0.01)
L_vals <- sapply(lambda_grid, likelihood, data = x)
mle_lambda <- lambda_grid[which.max(L_vals)]
print(paste("MLE of lambda (from grid search) =", mle_lambda, "\n\n"))


#2b: Conjugate prior: Gamma(alpha, beta)
alpha <- 2      # shape
beta  <- 1      # rate

prior <- function(lambda) dgamma(lambda, shape = alpha, rate = beta)

print(paste("Prior: lambda ~ Gamma(alpha = ", alpha, ", beta =", beta, ")\n\n"))


#2c: Posterior distribution
# pi(lambda | x) ~ Gamma(alpha + sum(x_i), beta + n)
alpha_post <- alpha + sum_x
beta_post  <- beta + n

posterior <- function(lambda) dgamma(lambda, shape = alpha_post, rate = beta_post)

print(paste("Posterior: lambda | x ~ Gamma(alpha* =", alpha_post, ", beta* =", beta_post, ")\n\n"))


#2d:  Minimum Bayes risk estimator
# Under squared-error loss -> Bayes estimator = posterior mean
# Under absolute-error loss -> Bayes estimator = posterior median
lambda_bayes_mean   <- alpha_post / beta_post
lambda_bayes_median <- qgamma(0.5, shape = alpha_post, rate = beta_post)

print(paste("Bayes estimator under squared-error loss (posterior mean)   =", lambda_bayes_mean, "\n"))
print(paste("Bayes estimator under absolute-error loss (posterior median) =", lambda_bayes_median, "\n\n"))

# Posterior variance (useful for reporting uncertainty)
post_var <- alpha_post / (beta_post^2)
print(paste("Posterior variance of lambda =", post_var, "\n"))
print(paste("Posterior 95% credible interval =", qgamma(c(0.025, 0.975), shape = alpha_post, rate = beta_post), "\n\n"))

# Plot: Prior vs Posterior
lambda_seq <- seq(0, 10, length.out = 500)

plot(lambda_seq, prior(lambda_seq), type = "l", col = "blue", lwd = 2,
     ylim = c(0, max(posterior(lambda_seq), prior(lambda_seq))),
     xlab = expression(lambda), ylab = "Density",
     main = "Prior vs Posterior Distribution of lambda")
lines(lambda_seq, posterior(lambda_seq), col = "red", lwd = 2)
abline(v = lambda_bayes_mean, col = "darkgreen", lty = 2, lwd = 2)
legend("topright",
       legend = c(paste0("Prior: Gamma(", alpha, ",", beta, ")"),
                  paste0("Posterior: Gamma(", alpha_post, ",", beta_post, ")"),
                  "Bayes estimate (posterior mean)"),
       col = c("blue", "red", "darkgreen"),
       lty = c(1, 1, 2), lwd = 2, bty = "n")


#Task 3: Nasdaq Financial data
#install.packages("tidyquant")
#library(tidyquant)
#install.packages("quantmod")
#library(quantmod)
#install.packages("tseries")
#library(tseries)
#install.packages("timeSeries")
#library(timeSeries)
#library(forecast)

#Downloaded NASDAQ Index from yahoo finance
getSymbols("^IXIC",
           src = "yahoo",
           from = "2021-01-01",
           to = "2025-12-31")

#the variable used is the closing price from the NASDAQ index
nasdaq = IXIC$IXIC.Close

#Checking the class, string, view and head of the data
class(nasdaq)
str(nasdaq)
#View(nasdaq)
head(nasdaq)

#3a) Checking for stationarity in mean and variance
#plotting a time series from the original data
plot(index(nasdaq),
     as.numeric(nasdaq),
     type = "l",
     main = "NASDAQ Composite Closing Price",
     xlab = "Date",
     ylab = "Closing Price")

#To add trend line
trend = lm(as.numeric(nasdaq) ~ seq_along(nasdaq))
lines(index(nasdaq), fitted(trend), col = "red", lwd = 2)


adf.test(as.numeric(nasdaq), alternative = "stationary")

#Apply first differencing to make mean more stationary
d_nasdaq = diff(nasdaq)
d_nasdaq = na.omit(d_nasdaq)

# Plot the differenced series
plot(index(d_nasdaq),
     as.numeric(d_nasdaq),
     type = "l",
     main = "First Differenced NASDAQ Closing Prices",
     xlab = "Date",
     ylab = "First Difference")

#ADF after differencing
adf.test(as.numeric(d_nasdaq), alternative = "stationary")

#check staionarity using log-differenced NASDAQ series
log_nasdaq = log(nasdaq) 
d_log_nasdaq = na.omit(diff(log_nasdaq)) 

#ADF after log differencing
adf.test(as.numeric(d_log_nasdaq), alternative = "stationary")

#3b) Identifying the order of AR and MA using acf and pacf
#acf and pacf of original series
acf(as.numeric(nasdaq), lag.max = 20)
pacf(as.numeric(nasdaq), lag.max = 20)

#acf and pacf of differenced series
acf(as.numeric(d_nasdaq), lag.max = 20)
pacf(as.numeric(d_nasdaq), lag.max = 20)

# Candidate ARIMA models based on ACF and PACF
fit1 = Arima(nasdaq, order = c(1,1,0))
fit2 = Arima(nasdaq, order = c(0,1,1))
fit3 = Arima(nasdaq, order = c(1,1,1))

# View model summaries
summary(fit1)
summary(fit2)
summary(fit3)

# Compare models using AIC
AIC(fit1, fit2, fit3)

#3c) ARIMA model selection
auto.fit = auto.arima(nasdaq, seasonal = FALSE)
summary(auto.fit)

#checking residual fit
checkresiduals(auto.fit)

#3d) forecast, h=10
manual.fcast = forecast(fit1, h = 10) #using manual arima
plot(manual.fcast)

# Forecast using the final model
auto.fcast = forecast(auto.fit, h = 10)

# Display forecast values
auto.fcast

# Plot the forecast
plot(auto.fcast,
     main = "10-Step Ahead Forecast of NASDAQ Composite Index",
     xlab = "Date",
     ylab = "Closing Price")


#checking residual fit
checkresiduals(fit1)
