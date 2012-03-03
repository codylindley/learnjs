function _f() {
//INSERT_CODE
global_a=1;
var local_b=2;
//EXIT;
_exit = true;
Debug.setListener(null);
}
Debug = debug.Debug
var _steps = 0;

if (typeof _maxStep === 'undefined') {
    var _maxStep = 100;
}

var _print = print;
var _exit = false;
var _stdout = '';
print = function(_msg) {
     _stdout += _msg +'\n';
};
var _globals_internals = [];
function listener(event, exec_state, event_data, data) {
  if (event == Debug.DebugEvent.Break) {
      if (_steps > _maxStep) {
          var end = {
              event: "instruction_limit_reached",
              exception_msg: "max _steps reached:"+_maxStep,
          }
          _print(JSON.stringify(end));
          return;
      }
      if (_exit) { return; }
      var frame = exec_state.frame();
      var details_ = frame.details_.details_;
      var globals_ = details_[1];
      if (_steps === 0) {
          for (var _i in globals_) {
              //_print(_i);
              if (globals_.hasOwnProperty(_i)) {
                  _globals_internals.push(_i);
              }
          }
          //_print(_globals_internals);
      }
      var globals = {};
      for (var _i in globals_) {
          if (globals_.hasOwnProperty(_i) && _globals_internals.indexOf(_i) < 0) {
              globals[_i] = globals_[_i];
          }
      }
      //_print(JSON.stringify(globals));
      //_print(JSON.stringify(details_));
      var local = 9;
      var locals = {};
      while(local+1 < details_.length) {
          var key = details_[local];
          var value = details_[local+1];
          locals[key] = value;
          local += 2;
      }
      var step = {
        event: "step_line",
        func_name: "",//frame.func(),
        globals: globals,
        locals: locals,
        line: frame.sourceLine(),
        //text: frame.sourceLineText(),
        stack_locals: [],
        stdout: _stdout,
        }
      _steps++;
      exec_state.prepareStep(Debug.StepAction.StepIn, 1);
      _print(JSON.stringify(step));
  }
};

// Add the debug event listener.
Debug.setListener(listener);

// Set a breakpoint on the for statement (line 1).
Debug.setBreakPoint(_f, 1);

_f();
// Get rid of the debug event listener.

