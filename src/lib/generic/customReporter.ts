import type {
    FullConfig, FullResult, Reporter, Suite, TestCase, TestResult,
    TestStep
  } from '@playwright/test/reporter';
  
  class MyReporter implements Reporter {

    onStepBegin(test, result, step: TestStep) {
      console.log(`Starting step: ${step.title}`);
    }
  
    onStepEnd(test, result, step: TestStep) {
      console.log(`Finished step: ${step.title}`);
    }
    
    onBegin(config: FullConfig, suite: Suite) {
      console.log(`Starting the run with ${suite.allTests().length} tests`);
    }
  
    onTestBegin(test: TestCase, result: TestResult) {
      console.log(`Starting test ${test.title}`);
    }
  
    onTestEnd(test: TestCase, result: TestResult) {
      console.log(`Finished test ${test.title}: ${result.status}`);
    }
  
    onEnd(result: FullResult) {
      console.log(`Finished the run: ${result.status}`);
    }
    printsToStdio(): boolean {
      return false;
    }
  }
  
  export default MyReporter;